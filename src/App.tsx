import React, { useState } from 'react';
import { Header } from './components/Header';
import { GrammarInput } from './components/GrammarInput';
import { SLRTableClosure } from './components/SLRTableClosure';
import { FirstFollowTable } from './components/FirstFollowTable';
import { ParseTree } from './components/ParseTree';
import { SLRSyntaxTable } from './components/SLRSyntaxTable';
import { InputParser } from './components/InputParser';
import { TeamSection } from './components/TeamSection';
import { SLRParser } from './utils/slrParser';
import { State, FirstFollowSet, ParseStep } from './types/grammar';

function App() {
  const [parser] = useState(new SLRParser());
  const [states, setStates] = useState<State[]>([]);
  const [firstFollowSets, setFirstFollowSets] = useState<FirstFollowSet[]>([]);
  const [showTables, setShowTables] = useState(false);
  const [parseSteps, setParseSteps] = useState<ParseStep[]>([]);

  const handleGrammarChange = (grammar: string) => {
    parser.parseGrammar(grammar);
    setShowTables(false);
    setParseSteps([]);
  };

  const handleGenerateTables = () => {
    try {
      parser.generateStates();
      const generatedStates = parser.getStates();
      const firstFollow = parser.getFirstFollowSets();
      
      setStates(generatedStates);
      setFirstFollowSets(firstFollow);
      setShowTables(true);
      setParseSteps([]);
    } catch (error) {
      console.error('Error generating tables:', error);
      alert('Error generating tables. Please check your grammar.');
    }
  };

  const handleParse = (input: string): ParseStep[] => {
    try {
      const steps = parser.parseInput(input);
      setParseSteps(steps);
      return steps;
    } catch (error) {
      console.error('Error parsing input:', error);
      alert('Error parsing input. Please check your input string.');
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GrammarInput 
          onGrammarChange={handleGrammarChange}
          onGenerateTables={handleGenerateTables}
        />
        
        {showTables && (
          <>
            <SLRTableClosure states={states} />
            <FirstFollowTable firstFollowSets={firstFollowSets} />
            <ParseTree treeData={null} parseSteps={parseSteps} />
            <SLRSyntaxTable parser={parser} />
            <InputParser onParse={handleParse} />
          </>
        )}
      </main>
      
      <TeamSection />
    </div>
  );
}

export default App;