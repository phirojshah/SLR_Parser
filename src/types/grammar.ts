export interface Production {
  left: string;
  right: string[];
}

export interface GrammarRule {
  id: number;
  production: Production;
  display: string;
}

export interface Item {
  production: Production;
  dotPosition: number;
  lookAhead?: string;
}

export interface State {
  id: number;
  items: Item[];
  goto: Map<string, number>;
  closure: Item[];
}

export interface FirstFollowSet {
  nonTerminal: string;
  first: string[];
  follow: string[];
}

export interface SLRTableEntry {
  state: number;
  action: Map<string, string>;
  goto: Map<string, number>;
}

export interface ParseStep {
  step: number;
  stack: string[];
  input: string;
  action: string;
}

export interface ParseTreeNode {
  id: string;
  symbol: string;
  children: ParseTreeNode[];
  x?: number;
  y?: number;
}