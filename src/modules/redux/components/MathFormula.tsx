import React from 'react';

interface MathFormulaProps {
  latex: string;
}

export default function MathFormula({ latex }: MathFormulaProps) {
  const formatLatex = (text: string) => {
    let parsed = text;
    
    const replacements: { [key: string]: string } = {
      '\\mathcal{S}': 'S',
      '\\mathcal{O}': 'O',
      '\\mathcal{P}': 'P',
      '\\mathbf{SingleStore}': 'SingleStore',
      '\\mathbf{Actions}': 'Actions',
      '\\mathbf{Store}': 'Store',
      '\\mathbf{Record}': 'Record',
      '\\mathbf{FeatureFolder}': 'FeatureFolder',
      '\\mathbf{LocalState}': 'LocalState',
      '\\mathbf{ReduxState}': 'ReduxState',
      '\\mathbf{Component}': 'Component',
      '\\mathbf{GlobalStore}': 'GlobalStore',
      '\\mathbf{Assert}': 'Assert',
      '\\mathbf{S}': 'S',
      '\\text{string}': 'string',
      '\\text{pending}': 'pending',
      '\\text{fulfilled}': 'fulfilled',
      '\\text{rejected}': 'rejected',
      '\\text{dispatch}': 'dispatch',
      '\\text{function}': 'function',
      '\\text{pure}': 'pure',
      '\\text{where}': 'where',
      '\\text{is}': 'is',
      '\\text{unchanged}': 'unchanged',
      '\\text{No}': 'No',
      '\\text{mutations}': 'mutations',
      '\\text{Immer}': 'Immer',
      '\\text{State}': 'State',
      '\\text{Proxy}': 'Proxy',
      '\\text{Draft}': 'Draft',
      '\\text{New}': 'New',
      '\\text{configureStore}': 'configureStore',
      '\\text{Thunk}': 'Thunk',
      '\\text{DevTools}': 'DevTools',
      '\\text{AsyncThunk}': 'AsyncThunk',
      '\\text{Selector}': 'Selector',
      '\\text{createSelector}': 'createSelector',
      '\\text{cached}': 'cached',
      '\\text{Dispatch}': 'Dispatch',
      '\\text{Reducer}': 'Reducer',
      '\\text{Promises}': 'Promises',
      '\\text{Saga}': 'Saga',
      '\\text{Generators/Channels}': 'Generators/Channels',
      '\\text{nested}': 'nested',
      '\\text{traversal}': 'traversal',
      '\\text{key}': 'key',
      '\\text{lookup}': 'lookup',
      '\\text{Normalized}': 'Normalized',
      '\\text{Adapter}': 'Adapter',
      '\\text{CRUD}': 'CRUD',
      '\\text{methods}': 'methods',
      '\\text{Pre-built}': 'Pre-built',
      '\\text{Selectors}': 'Selectors',
      '\\text{connect}': 'connect',
      '\\text{useSelector}': 'useSelector',
      '\\text{useDispatch}': 'useDispatch',
      '\\text{shallowEqual}': 'shallowEqual',
      '\\text{Comp}': 'Comp',
      '\\text{extraReducers}': 'extraReducers',
      '\\text{Handles}': 'Handles',
      '\\text{global}': 'global',
      '\\text{action}': 'action',
      '\\text{matches}': 'matches',
      '\\text{UI}': 'UI',
      '\\text{immediate}': 'immediate',
      '\\text{Update}': 'Update',
      '\\text{On}': 'On',
      '\\text{Failure}': 'Failure',
      '\\text{Revert}': 'Revert',
      '\\text{to}': 'to',
      '\\text{backup}': 'backup',
      '\\text{Structure}': 'Structure',
      '\\text{Slice}': 'Slice',
      '\\text{Components}': 'Components',
      '\\text{API}': 'API',
      '\\text{Centralized}': 'Centralized',
      '\\text{consistency}': 'consistency',
      '\\text{vs}': 'vs',
      '\\text{Complexity}': 'Complexity',
      '\\text{scaling}': 'scaling',
      '\\text{Middleware}': 'Middleware',
      '\\text{next}': 'next',
      '\\text{result}': 'result',
      '\\text{Log}': 'Log',
      '\\text{Next}': 'Next',
      '\\text{Side}': 'Side',
      '\\text{Effect}': 'Effect',
      '\\text{Container}': 'Container',
      '\\text{Presentational}': 'Presentational',
      '\\text{Props}': 'Props',
      '\\text{Redux}': 'Redux',
      '\\text{Toolkit}': 'Redux Toolkit',
      '\\text{Best}': 'Best',
      '\\text{Practices}': 'Practices',
      '\\text{Dev}': 'Dev',
      '\\text{Velocity}': 'Velocity',
      '\\text{Plain}': 'Plain',
      '\\text{XSS}': 'XSS',
      '\\text{Vulnerability}': 'Vulnerability',
      '\\text{localStorage}': 'localStorage',
      '\\text{AuthTokens}': 'AuthTokens',
      '\\text{Reducers}': 'Reducers',
      '\\text{if}': 'if',
      '\\text{Env}': 'Env',
      '\\text{Prod}': 'Prod',
      '\\text{Colocation}': 'Colocation',
      '\\text{Constants}': 'Constants',
      '\\text{Actions}': 'Actions',
      '\\text{OneFile}': 'OneFile',
      '\\text{Thunks}': 'Thunks',
      '\\text{Caching}': 'Caching',
      '\\text{Auto-Loading}': 'Auto-Loading',
      '\\text{Hooks}': 'Hooks',
      '\\text{Auto-Validation}': 'Auto-Validation',
      '\\text{Server}': 'Server',
      '\\text{Client}': 'Client',
      '\\text{Logic}': 'Logic',
      '\\text{Mutation}': 'Mutation',
      '\\text{Succeeds}': 'Succeeds',
      '\\text{Invalidate}': 'Invalidate',
      '\\text{Refetch}': 'Refetch',
      '\\text{QueryWithTag}': 'QueryWithTag',
      '\\text{Query}': 'Query',
      '\\text{page}': 'page',
      '\\text{Cache}': 'Cache',
      '\\text{merge}': 'merge',
      '\\text{prev}': 'prev',
      '\\text{Debug}': 'Debug',
      '\\text{VerifyDispatch}': 'VerifyDispatch',
      '\\text{VerifyReducerPure}': 'VerifyReducerPure',
      '\\text{VerifySelectorPath}': 'VerifySelectorPath',
      '\\text{MutationError}': 'MutationError',
      '\\text{ObjectReference}': 'ObjectReference',
      '\\text{InternalValue}': 'InternalValue',
      '\\text{FocusedSlice}': 'FocusedSlice',
      '\\text{DoubleTap}': 'DoubleTap',
      '\\text{debounce}': 'debounce',
      '\\rightarrow': ' → ',
      '\\longrightarrow': ' ⟶ ',
      '\\implies': ' ⟹ ',
      '\\iff': ' ⟺ ',
      '\\in': ' ∈ ',
      '\\notin': ' ∉ ',
      '\\equiv': ' ≡ ',
      '\\neq': ' ≠ ',
      '\\Delta': 'Δ',
      '\\mathcal{K}': 'K',
      '\\oplus': ' ⊕ ',
      '\\cup': ' ∪ ',
      '\\cap': ' ∩ ',
      '\\langle': '⟨',
      '\\rangle': '⟩',
      '\\forall': ' ∀ ',
      '\\exists': ' ∃ ',
      '\\subset': ' ⊂ ',
      '\\supset': ' ⊃ ',
      '\\subseteq': ' ⊆ ',
      '\\supseteq': ' ⊇ ',
      '\\alpha': 'α',
      '\\beta': 'β',
      '\\gamma': 'γ',
      '\\times': ' × ',
      '\\wedge': ' ∧ ',
      '\\vee': ' ∨ ',
      '\\{': '{',
      '\\}': '}',
      '\\\\': ' | ',
      '\\quad': '  ',
      '\\text': '',
      '\\mathbf': '',
      '\\mathcal': ''
    };

    let parts: React.ReactNode[] = [];
    let textToParse = parsed;

    // Apply exact mapping replacements
    const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      textToParse = textToParse.replaceAll(key, replacements[key]);
    }

    // Split subscripts
    const splitParts = textToParse.split(/(_\{[^{}]+\}|_[a-zA-Z0-9])/);
    return splitParts.map((part, index) => {
      if (part.startsWith('_{') && part.endsWith('}')) {
        return <sub key={index} className="text-[11px] text-cyan-400 font-mono font-medium italic">{part.slice(2, -1)}</sub>;
      } else if (part.startsWith('_')) {
        return <sub key={index} className="text-[11px] text-cyan-400 font-mono font-medium italic">{part.slice(1)}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex items-center justify-center py-3.5 px-5 bg-slate-950 border border-slate-800/80 rounded-xl my-3.5 shadow-inner">
      <div className="text-center w-full">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1 select-none">Mathematical Relation</div>
        <div className="font-serif text-base md:text-lg text-slate-200 tracking-wide select-all flex items-center justify-center gap-0.5 flex-wrap">
          {formatLatex(latex)}
        </div>
      </div>
    </div>
  );
}
