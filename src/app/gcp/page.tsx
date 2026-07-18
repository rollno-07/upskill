'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

const GCPApp = dynamic(() => import('@/modules/gcp/App'), { ssr: false });

export default function GCPPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070709]">
      <div className="sticky top-0 z-50 bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-900/60 px-4 py-2.5 flex justify-between items-center text-xs font-mono text-zinc-400">
        <Link href="/" className="flex items-center gap-1.5 hover:text-white transition-all group">
          <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-all" />
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span>Back to Upskill Portal</span>
        </Link>
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">GCP Cloud Architecture</span>
      </div>
      <div className="flex-grow">
        <GCPApp />
      </div>
    </div>
  );
}
