import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode, HelpCircle, ShieldAlert } from 'lucide-react';

export default function Cheatsheet() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sections = [
    {
      id: 'install',
      title: 'Installation & CLI Setup',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      code: `# Standard package installations
npm i @reduxjs/toolkit react-redux

# Create clean templates instantly
npx degit reduxjs/redux-templates/templates/cra-template-redux-typescript my-app`
    },
    {
      id: 'slice',
      title: 'RTK slice configuration (createSlice)',
      icon: <FileCode className="w-4 h-4 text-cyan-400" />,
      code: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immutable mutations via Immer
    },
    addAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const { increment, addAmount } = counterSlice.actions;
export default counterSlice.reducer;`
    },
    {
      id: 'store',
      title: 'Configure Store & Type Exports',
      icon: <FileCode className="w-4 h-4 text-emerald-400" />,
      code: `import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`
    },
    {
      id: 'hooks',
      title: 'Pre-typed Hooks (TypeScript)',
      icon: <FileCode className="w-4 h-4 text-teal-400" />,
      code: `import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain useDispatch / useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();`
    },
    {
      id: 'async',
      title: 'Async Actions (createAsyncThunk)',
      icon: <FileCode className="w-4 h-4 text-sky-400" />,
      code: `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'users/fetchById',
  async (userId: number) => {
    const res = await fetch(\`/api/users/\${userId}\`);
    return res.json();
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: { data: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  }
});`
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl my-4 text-slate-300">
      <div className="mb-4 border-b border-slate-800 pb-3">
        <h4 className="font-semibold text-slate-100 text-sm md:text-base flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" /> Redux Toolkit Quick Reference (Cheatsheet)
        </h4>
        <p className="text-xs text-zinc-500 mt-1">Copy and paste production-ready setups to jump-start any project.</p>
      </div>

      <div className="space-y-4">
        {sections.map(sec => (
          <div key={sec.id} className="border border-slate-850 bg-slate-950 rounded-xl p-4 shadow-sm space-y-2 relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {sec.icon}
                <span className="text-xs font-semibold text-slate-200">{sec.title}</span>
              </div>
              <button
                onClick={() => handleCopy(sec.id, sec.code)}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded border border-slate-800 hover:border-slate-750 text-[10px] font-mono text-zinc-500 hover:text-slate-200 transition-all flex items-center gap-1 cursor-pointer select-none"
              >
                {copiedId === sec.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400 animate-pulse" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Snippet
                  </>
                )}
              </button>
            </div>

            <pre className="text-[11px] font-mono leading-relaxed text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-slate-900/60 overflow-x-auto select-text font-medium max-h-48">
              {sec.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
