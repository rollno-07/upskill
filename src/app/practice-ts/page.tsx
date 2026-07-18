'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Terminal, Play, Check, Code, Shield, HelpCircle, AlertCircle } from 'lucide-react';

interface CodeSection {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string[];
  consoleOutput?: string;
}

export default function TypeScriptLab() {
  const [activeSectionId, setActiveSectionId] = useState('primitives');
  const [compilerStatus, setCompilerStatus] = useState<'idle' | 'compiling' | 'success'>('success');
  const [outputLines, setOutputLines] = useState<string[]>([]);

  const sections: CodeSection[] = [
    {
      id: 'primitives',
      title: '1. Explicit Primitives',
      description: 'Declaring explicit types for primitive values like strings, numbers, and booleans.',
      code: `let username: string = "vivek";
let age: number = 24;
let employed: boolean = true;

console.log({ username, age, employed });`,
      explanation: [
        'TypeScript allows annotating variables with explicit types using colon syntax: variableName: type',
        'If you attempt to assign a value of a different type (e.g. username = 42), the TS compiler throws a type-checking error at compile time.',
        'Primitive types correspond directly to JavaScript primitives: string, number, boolean, null, undefined, and symbol.'
      ],
      consoleOutput: '{ username: "vivek", age: 24, employed: true }'
    },
    {
      id: 'arrays',
      title: '2. Arrays',
      description: 'Typing collections of values of the same type.',
      code: `let score: number[] = [10, 20, 30];
let names: string[] = ["vivek", "hitesh", "ram"];

console.log({ score, names });`,
      explanation: [
        'Array types can be written in two ways: type[] or Array<type> (generic syntax).',
        'type[] ensures all elements inside the array strictly conform to the declared type.',
        'Array methods like push, pop, filter, and map are typed automatically based on the array type.'
      ],
      consoleOutput: '{ score: [10, 20, 30], names: ["vivek", "hitesh", "ram"] }'
    },
    {
      id: 'tuples',
      title: '3. Tuples',
      description: 'Arrays with a fixed number of elements whose types are known at specific positions.',
      code: `let point: [number, number] = [10, 10];
let rgb: [number, number, number] = [0, 225, 0];
let basecolor: typeof rgb = [0, 225, 0];

console.log({ point, rgb, basecolor });`,
      explanation: [
        'A tuple type specifies the exact type of element at each index.',
        'Useful for coordinate sets, colors, or React-style hook return values [value, setValue].',
        'TypeScript checks both the length of the tuple and the type at each position.'
      ],
      consoleOutput: '{ point: [10, 10], rgb: [0, 225, 0], basecolor: [0, 225, 0] }'
    },
    {
      id: 'enums',
      title: '4. Enums',
      description: 'Defining a set of named constants to represent categories or choices.',
      code: `enum Role {
    Admin,
    Editer,
    Viewer,
}

let myRole: Role = Role.Admin;

console.log({ myRole, adminVal: Role.Admin, editerVal: Role.Editer });`,
      explanation: [
        'Enums allow defining a set of friendly named constants.',
        'By default, enums are number-based (0-indexed). Role.Admin resolves to 0, Role.Editer resolves to 1, etc.',
        'You can also initialize enums with custom numbers or strings: enum Direction { Up = "UP", Down = "DOWN" }.'
      ],
      consoleOutput: '{ myRole: 0, adminVal: 0, editerVal: 1 }'
    },
    {
      id: 'specials',
      title: '5. Special Types',
      description: 'Handling loose typing, deferred type checks, or functions that never return.',
      code: `let flexible: any = "can be anything, void this in real code";
let notsureyet: unknown = "24";

function throwsError(): never {
    throw new Error("this function never returns normally");
}

console.log({ flexible, notsureyet });`,
      explanation: [
        'any: Opts out of all compile-time type checks. Avoid using any in production code as it defeats the purpose of TypeScript.',
        'unknown: A type-safe counterpart to any. Anything is assignable to unknown, but you cannot perform operations on it without type narrowing/refinement (e.g. via typeof checks).',
        'never: Represents values that never occur. Commonly used for functions that always throw exceptions or infinite loops, or in exhaustive type checks.'
      ],
      consoleOutput: '{ flexible: "can be anything, void this in real code", notsureyet: "24" }'
    },
    {
      id: 'unions',
      title: '6. Unions & Literals',
      description: 'Variables that can hold one of multiple types or specific exact values.',
      code: `let id: string | number;
id = "id123";
id = 123;

let direction: "up" | "down" | "left" | "right";
direction = "up";

let status: "pending" | "shipped" | "delivered";
status = "pending";

console.log({ id, direction, status });`,
      explanation: [
        'Union Types (typeA | typeB): Expresses a value that can be one of several types.',
        'Literal Types: Restricts a variable to hold an exact specific value (e.g. direction can only be "up", "down", etc., not any generic string).',
        'Combining Union and Literal types creates powerful, self-documenting choice lists.'
      ],
      consoleOutput: '{ id: 123, direction: "up", status: "pending" }'
    },
    {
      id: 'functions',
      title: '7. Functions',
      description: 'Typing function parameters, return values, optional arguments, and default parameters.',
      code: `function add(a: number, b: number): number {
    return a + b;
}

function greet(name: string, greeting?: string): string {
    return \`\${greeting ?? "hello"}, \${name}\`;
}

function multiply(a: number, b: number = 2): number {
    return a * b;
}

function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

let calculate: (a: number, b: number) => number;
calculate = (a, b) => a + b;

console.log(add(4, 5), greet("vivek"), multiply(5), sum(1, 2, 3));`,
      explanation: [
        'Parameter typing ensures that correct types are passed to functions.',
        'Return type annotations (e.g. : number) enforce what the function returns.',
        'greeting?: string indicates an optional parameter, which evaluates to undefined if omitted.',
        'b: number = 2 defines a default parameter value, making the argument optional.',
        'Rest parameters (...numbers: number[]) type arbitrary lists of arguments as arrays.'
      ],
      consoleOutput: '9 "hello, vivek" 10 6'
    },
    {
      id: 'interfaces',
      title: '8. Interfaces & Type Aliases',
      description: 'Describing the shape of objects, extending shapes, and using index signatures.',
      code: `interface User {
    id: string;
    name: string;
    email: string;
    age?: string;
    readonly createdAt: string;
}

const user: User = {
    id: "123",
    name: "vivek",
    email: "[EMAIL_ADDRESS]",
    createdAt: "2025-01-01",
};

interface Admin extends User {
    permission: string[];
}

type Product = {
    id: string;
    name: string;
    price: number;
};

interface Dictionary {
    [key: string]: number;
}
const scoresByName: Dictionary = { alice: 90, bob: 85 };

console.log({ user, scoresByName });`,
      explanation: [
        'Interfaces (interface): The standard way to define the shape of objects in TypeScript. They can be merged or extended.',
        'Type Aliases (type): Define a name for any type, including primitives, unions, intersections, and tuples.',
        'readonly: Prevents fields from being reassigned after initialization.',
        'Index Signatures ([key: string]: number): Used when you do not know all the key names ahead of time, but you know the types of keys and values.'
      ],
      consoleOutput: '{ user: { id: "123", name: "vivek", email: "[EMAIL_ADDRESS]", createdAt: "2025-01-01" }, scoresByName: { alice: 90, bob: 85 } }'
    }
  ];

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  const runCode = () => {
    setCompilerStatus('compiling');
    setOutputLines([]);
    setTimeout(() => {
      setCompilerStatus('success');
      if (activeSection.consoleOutput) {
        setOutputLines([
          '❯ tsc level1.ts --noEmit',
          '✓ Compilation successful (0 errors)',
          '❯ node level1.js',
          activeSection.consoleOutput
        ]);
      }
    }, 850);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-zinc-100 font-sans">
      
      {/* Portal Header bar */}
      <div className="sticky top-0 z-50 bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-900/60 px-4 py-2.5 flex justify-between items-center text-xs font-mono text-zinc-400">
        <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-all group">
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-all" />
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Back to Upskill Portal</span>
        </Link>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">TypeScript Basics Lab</span>
      </div>

      {/* Main content grid */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar selection */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 space-y-1">
            <h3 className="text-xs font-mono text-[#3178C6] font-bold uppercase tracking-wider">TS Basics Lab</h3>
            <p className="text-[11px] text-zinc-400 font-sans">Interactive code inspector for practiceTS level 1 exercises.</p>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[70vh]">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSectionId(sec.id);
                  setOutputLines([]);
                  setCompilerStatus('idle');
                }}
                className={`w-full text-left p-3 rounded-lg text-xs font-semibold border transition-all flex flex-col gap-1.5 ${
                  activeSectionId === sec.id
                    ? 'bg-[#3178C6]/10 border-[#3178C6]/30 text-white shadow-lg shadow-[#3178C6]/5'
                    : 'bg-zinc-950/40 border-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800'
                }`}
              >
                <div className="font-display truncate">{sec.title}</div>
                <div className="text-[10px] font-normal leading-normal text-zinc-500 font-sans line-clamp-1">{sec.description}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Content main */}
        <main className="flex-grow flex flex-col lg:flex-row gap-6 min-w-0">
          
          {/* Editor and Terminal panel */}
          <div className="flex-grow flex flex-col gap-4 min-w-0">
            {/* Editor Console */}
            <div className="flex-grow flex flex-col rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl min-h-[400px]">
              {/* Header Tab */}
              <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-900/40 flex justify-between items-center text-xs font-mono">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Code className="w-3.5 h-3.5 text-[#3178C6]" />
                  level1.ts
                </span>
                <button
                  onClick={runCode}
                  className="px-3 py-1 rounded bg-[#3178C6] hover:bg-[#3178C6]/80 text-white font-bold transition-all flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-white" />
                  Run
                </button>
              </div>

              {/* Code Editor body */}
              <pre className="flex-grow p-4 overflow-auto text-xs font-mono leading-relaxed text-zinc-300 bg-zinc-950">
                <code>{activeSection.code}</code>
              </pre>
            </div>

            {/* Terminal Console */}
            <div className="h-44 rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden flex flex-col font-mono">
              <div className="px-4 py-1.5 border-b border-zinc-900 bg-zinc-900/20 flex justify-between items-center text-[10px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-emerald-500" />
                  TS Compiler Terminal HUD
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    compilerStatus === 'success' ? 'bg-emerald-500 animate-pulse' :
                    compilerStatus === 'compiling' ? 'bg-cyan-500 animate-spin' :
                    'bg-zinc-600'
                  }`} />
                  {compilerStatus === 'success' ? 'STRICT_MODE: ON' : compilerStatus === 'compiling' ? 'Compiling...' : 'READY'}
                </span>
              </div>

              <div className="flex-grow p-3 text-[11px] overflow-auto text-zinc-400 bg-zinc-950 space-y-1">
                {outputLines.length === 0 ? (
                  <div className="text-zinc-600 italic select-none">Click the run button to execute level1.ts through the simulated type verification loop...</div>
                ) : (
                  outputLines.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={
                        line.startsWith('✓') ? 'text-emerald-400' :
                        line.startsWith('❯') ? 'text-[#3178C6]' :
                        'text-white pl-2'
                      }
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Explanation panel */}
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
            <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                <Shield className="w-4 h-4 text-[#3178C6]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Type Verification</h4>
              </div>

              <div className="space-y-3.5">
                {activeSection.explanation.map((exp, idx) => (
                  <div key={idx} className="flex gap-2 text-xs leading-relaxed text-zinc-400">
                    <span className="text-[#3178C6] mt-0.5">•</span>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-zinc-800/80 bg-zinc-950/20 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                <span className="font-semibold">Exercise Practice</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                Try writing variations of this TS type contract on your local editor to test the limits of strict mode compilation.
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
