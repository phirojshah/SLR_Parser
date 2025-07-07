import { Production, GrammarRule, Item, State, FirstFollowSet, SLRTableEntry, ParseStep, ParseTreeNode } from '../types/grammar';

export class SLRParser {
  private grammar: GrammarRule[] = [];
  private terminals: Set<string> = new Set();
  private nonTerminals: Set<string> = new Set();
  private firstSets: Map<string, Set<string>> = new Map();
  private followSets: Map<string, Set<string>> = new Map();
  private states: State[] = [];
  private slrTable: Map<number, Map<string, string>> = new Map();

  constructor() {
    this.initializeDefaultGrammar();
  }

  private initializeDefaultGrammar() {
    const defaultProductions = [
      { left: "E'", right: ["E"] },
      { left: "E", right: ["E", "+", "T"] },
      { left: "E", right: ["T"] },
      { left: "T", right: ["T", "*", "F"] },
      { left: "T", right: ["F"] },
      { left: "F", right: ["(", "E", ")"] },
      { left: "F", right: ["id"] }
    ];

    this.grammar = defaultProductions.map((prod, index) => ({
      id: index,
      production: prod,
      display: `${prod.left} → ${prod.right.join(' ')}`
    }));

    this.extractSymbols();
  }

  private extractSymbols() {
    this.terminals.clear();
    this.nonTerminals.clear();

    // First, collect all unique symbols from the entire grammar
    const allSymbols = new Set<string>();
    
    this.grammar.forEach(rule => {
      allSymbols.add(rule.production.left);
      rule.production.right.forEach(symbol => {
        if (symbol !== 'ε') {
          allSymbols.add(symbol);
        }
      });
    });

    // Now classify each symbol as terminal or non-terminal
    allSymbols.forEach(symbol => {
      if (this.isNonTerminal(symbol)) {
        this.nonTerminals.add(symbol);
      } else {
        this.terminals.add(symbol);
      }
    });

    this.terminals.add('$'); // End of input marker
  }

  private isNonTerminal(symbol: string): boolean {
    // Non-terminals are uppercase letters, possibly with prime (')
    return /^[A-Z]'?$/.test(symbol);
  }

  public parseGrammar(grammarText: string): void {
    const lines = grammarText.split('\n').filter(line => line.trim());
    this.grammar = [];

    lines.forEach((line, index) => {
      const parts = line.split('->').map(part => part.trim());
      if (parts.length === 2) {
        const left = parts[0];
        const right = parts[1] === 'ε' ? ['ε'] : parts[1].split(/\s+/).filter(s => s);
        
        this.grammar.push({
          id: index,
          production: { left, right },
          display: `${left} → ${right.join(' ')}`
        });
      }
    });

    this.extractSymbols();
  }

  public computeFirstSets(): void {
    this.firstSets.clear();

    // Initialize FIRST sets for all non-terminals
    this.nonTerminals.forEach(nt => {
      this.firstSets.set(nt, new Set());
    });

    // Initialize FIRST sets for terminals
    this.terminals.forEach(t => {
      this.firstSets.set(t, new Set([t]));
    });

    let changed = true;
    while (changed) {
      changed = false;
      
      this.grammar.forEach(rule => {
        const left = rule.production.left;
        const right = rule.production.right;
        const firstSet = this.firstSets.get(left)!;
        const oldSize = firstSet.size;

        // If production is A → ε
        if (right.length === 1 && right[0] === 'ε') {
          firstSet.add('ε');
        } else {
          // For A → X1 X2 ... Xn
          let i = 0;
          let canDeriveEpsilon = true;
          
          while (i < right.length && canDeriveEpsilon) {
            const symbol = right[i];
            canDeriveEpsilon = false;
            
            const firstOfSymbol = this.firstSets.get(symbol);
            if (firstOfSymbol) {
              // Add FIRST(Xi) - {ε} to FIRST(A)
              firstOfSymbol.forEach(s => {
                if (s !== 'ε') {
                  firstSet.add(s);
                }
              });
              
              // If ε ∈ FIRST(Xi), continue to next symbol
              if (firstOfSymbol.has('ε')) {
                canDeriveEpsilon = true;
              }
            }
            i++;
          }
          
          // If all symbols can derive ε, add ε to FIRST(A)
          if (canDeriveEpsilon && i === right.length) {
            firstSet.add('ε');
          }
        }

        if (firstSet.size !== oldSize) {
          changed = true;
        }
      });
    }
  }

  public computeFollowSets(): void {
    this.followSets.clear();

    // Initialize FOLLOW sets
    this.nonTerminals.forEach(nt => {
      this.followSets.set(nt, new Set());
    });

    // Add $ to FOLLOW of start symbol
    const startSymbol = this.grammar[0]?.production.left;
    if (startSymbol) {
      this.followSets.get(startSymbol)!.add('$');
    }

    let changed = true;
    while (changed) {
      changed = false;

      this.grammar.forEach(rule => {
        const left = rule.production.left;
        const right = rule.production.right;

        right.forEach((symbol, index) => {
          if (this.isNonTerminal(symbol)) {
            const followSet = this.followSets.get(symbol)!;
            const oldSize = followSet.size;

            // For A → αBβ, add FIRST(β) - {ε} to FOLLOW(B)
            if (index + 1 < right.length) {
              const beta = right.slice(index + 1);
              const firstOfBeta = this.computeFirstOfString(beta);
              
              firstOfBeta.forEach(s => {
                if (s !== 'ε') {
                  followSet.add(s);
                }
              });
              
              // If ε ∈ FIRST(β), add FOLLOW(A) to FOLLOW(B)
              if (firstOfBeta.has('ε')) {
                const followOfLeft = this.followSets.get(left);
                if (followOfLeft) {
                  followOfLeft.forEach(s => followSet.add(s));
                }
              }
            } else {
              // For A → αB, add FOLLOW(A) to FOLLOW(B)
              const followOfLeft = this.followSets.get(left);
              if (followOfLeft) {
                followOfLeft.forEach(s => followSet.add(s));
              }
            }

            if (followSet.size !== oldSize) {
              changed = true;
            }
          }
        });
      });
    }
  }

  private computeFirstOfString(symbols: string[]): Set<string> {
    const result = new Set<string>();
    
    if (symbols.length === 0) {
      result.add('ε');
      return result;
    }

    let i = 0;
    let canDeriveEpsilon = true;

    while (i < symbols.length && canDeriveEpsilon) {
      const symbol = symbols[i];
      canDeriveEpsilon = false;
      
      const firstOfSymbol = this.firstSets.get(symbol);
      if (firstOfSymbol) {
        firstOfSymbol.forEach(s => {
          if (s !== 'ε') {
            result.add(s);
          }
        });
        
        if (firstOfSymbol.has('ε')) {
          canDeriveEpsilon = true;
        }
      }
      i++;
    }

    if (canDeriveEpsilon && i === symbols.length) {
      result.add('ε');
    }

    return result;
  }

  public generateStates(): void {
    this.states = [];
    this.computeFirstSets();
    this.computeFollowSets();

    // Create initial state I0
    const initialItem: Item = {
      production: this.grammar[0].production,
      dotPosition: 0
    };

    const initialState: State = {
      id: 0,
      items: [initialItem],
      goto: new Map(),
      closure: []
    };

    initialState.closure = this.computeClosure([initialItem]);
    this.states.push(initialState);

    // Generate all states using worklist algorithm
    const worklist = [0];
    const processed = new Set<number>();

    while (worklist.length > 0) {
      const currentStateId = worklist.shift()!;
      if (processed.has(currentStateId)) continue;
      processed.add(currentStateId);

      const currentState = this.states[currentStateId];
      const symbols = new Set<string>();

      // Find all symbols after dots in current state's closure
      currentState.closure.forEach(item => {
        if (item.dotPosition < item.production.right.length) {
          symbols.add(item.production.right[item.dotPosition]);
        }
      });

      // Create new states for each symbol
      symbols.forEach(symbol => {
        const newItems = this.gotoItems(currentState.closure, symbol);
        if (newItems.length > 0) {
          const newClosure = this.computeClosure(newItems);
          let targetStateId = this.findExistingState(newClosure);
          
          if (targetStateId === -1) {
            // Create new state
            const newState: State = {
              id: this.states.length,
              items: newItems,
              goto: new Map(),
              closure: newClosure
            };
            this.states.push(newState);
            targetStateId = newState.id;
            worklist.push(targetStateId);
          }
          
          currentState.goto.set(symbol, targetStateId);
        }
      });
    }

    this.buildSLRTable();
  }

  private computeClosure(items: Item[]): Item[] {
    const closure = [...items];
    const added = new Set<string>();

    // Add initial items to the added set
    items.forEach(item => {
      const key = this.itemToString(item);
      added.add(key);
    });

    let changed = true;
    while (changed) {
      changed = false;
      const currentClosure = [...closure];

      currentClosure.forEach(item => {
        if (item.dotPosition < item.production.right.length) {
          const nextSymbol = item.production.right[item.dotPosition];
          
          if (this.isNonTerminal(nextSymbol)) {
            // Find all productions for this non-terminal
            this.grammar.forEach(rule => {
              if (rule.production.left === nextSymbol) {
                const newItem: Item = {
                  production: rule.production,
                  dotPosition: 0
                };
                
                const itemKey = this.itemToString(newItem);
                if (!added.has(itemKey)) {
                  closure.push(newItem);
                  added.add(itemKey);
                  changed = true;
                }
              }
            });
          }
        }
      });
    }

    return closure;
  }

  private gotoItems(items: Item[], symbol: string): Item[] {
    const result: Item[] = [];

    items.forEach(item => {
      if (item.dotPosition < item.production.right.length &&
          item.production.right[item.dotPosition] === symbol) {
        result.push({
          production: item.production,
          dotPosition: item.dotPosition + 1
        });
      }
    });

    return result;
  }

  private findExistingState(closure: Item[]): number {
    for (let i = 0; i < this.states.length; i++) {
      if (this.closuresEqual(this.states[i].closure, closure)) {
        return i;
      }
    }
    return -1;
  }

  private closuresEqual(closure1: Item[], closure2: Item[]): boolean {
    if (closure1.length !== closure2.length) return false;

    const set1 = new Set(closure1.map(item => this.itemToString(item)));
    const set2 = new Set(closure2.map(item => this.itemToString(item)));

    return set1.size === set2.size && [...set1].every(item => set2.has(item));
  }

  private itemToString(item: Item): string {
    const rightPart = [...item.production.right];
    rightPart.splice(item.dotPosition, 0, '•');
    return `${item.production.left} → ${rightPart.join(' ')}`;
  }

  private buildSLRTable(): void {
    this.slrTable.clear();

    this.states.forEach(state => {
      const actionMap = new Map<string, string>();
      
      state.closure.forEach(item => {
        const { production, dotPosition } = item;
        
        if (dotPosition < production.right.length) {
          // Shift action
          const nextSymbol = production.right[dotPosition];
          if (!this.isNonTerminal(nextSymbol)) {
            const nextState = state.goto.get(nextSymbol);
            if (nextState !== undefined) {
              actionMap.set(nextSymbol, `s${nextState}`);
            }
          }
        } else {
          // Reduce action
          if (production.left === this.grammar[0].production.left && 
              production.right.length === 1 && 
              production.right[0] === this.grammar[1]?.production.left) {
            // Accept action
            actionMap.set('$', 'acc');
          } else {
            // Find production number for reduce action
            const prodIndex = this.grammar.findIndex(rule => 
              rule.production.left === production.left &&
              rule.production.right.length === production.right.length &&
              rule.production.right.every((sym, i) => sym === production.right[i])
            );
            
            if (prodIndex !== -1) {
              const followSet = this.followSets.get(production.left);
              if (followSet) {
                followSet.forEach(symbol => {
                  actionMap.set(symbol, `r${prodIndex}`);
                });
              }
            }
          }
        }
      });

      this.slrTable.set(state.id, actionMap);
    });
  }

  public getSLRTable(): Map<number, Map<string, string>> {
    return this.slrTable;
  }

  public getGrammar(): GrammarRule[] {
    return this.grammar;
  }

  public getStates(): State[] {
    return this.states;
  }

  public getFirstFollowSets(): FirstFollowSet[] {
    const result: FirstFollowSet[] = [];
    
    this.nonTerminals.forEach(nt => {
      result.push({
        nonTerminal: nt,
        first: Array.from(this.firstSets.get(nt) || []).sort(),
        follow: Array.from(this.followSets.get(nt) || []).sort()
      });
    });

    return result.sort((a, b) => a.nonTerminal.localeCompare(b.nonTerminal));
  }

  public parseInput(input: string): ParseStep[] {
    const steps: ParseStep[] = [];
    const stack = ['0'];
    let inputBuffer = input.split(/\s+/).filter(s => s);
    inputBuffer.push('$');

    let stepNumber = 1;

    while (true) {
      const currentState = parseInt(stack[stack.length - 1]);
      const currentInput = inputBuffer[0];

      const actionMap = this.slrTable.get(currentState);
      const action = actionMap?.get(currentInput) || 'error';

      steps.push({
        step: stepNumber++,
        stack: [...stack],
        input: inputBuffer.join(' '),
        action: action === 'error' ? `Error: No action for state ${currentState} and input ${currentInput}` : action
      });

      if (action === 'acc') {
        steps.push({
          step: stepNumber++,
          stack: [...stack],
          input: inputBuffer.join(' '),
          action: 'Accept - Input successfully parsed'
        });
        break;
      } else if (action.startsWith('s')) {
        // Shift action
        const nextState = action.substring(1);
        stack.push(currentInput);
        stack.push(nextState);
        inputBuffer.shift();
      } else if (action.startsWith('r')) {
        // Reduce action
        const prodIndex = parseInt(action.substring(1));
        const production = this.grammar[prodIndex];
        
        if (production) {
          // Pop 2 * |production.right| symbols from stack
          const popCount = production.production.right[0] === 'ε' ? 0 : production.production.right.length * 2;
          for (let i = 0; i < popCount; i++) {
            stack.pop();
          }
          
          // Push non-terminal
          stack.push(production.production.left);
          
          // Get goto state
          const topState = parseInt(stack[stack.length - 2]);
          const gotoState = this.states[topState]?.goto.get(production.production.left);
          if (gotoState !== undefined) {
            stack.push(gotoState.toString());
          }
        }
      } else {
        // Error
        break;
      }

      if (stepNumber > 50) { // Prevent infinite loops
        steps.push({
          step: stepNumber++,
          stack: [...stack],
          input: inputBuffer.join(' '),
          action: 'Parsing terminated - Maximum steps reached'
        });
        break;
      }
    }

    return steps;
  }
}