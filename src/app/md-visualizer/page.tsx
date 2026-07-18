'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MDVisualizerApp = dynamic(() => import('@/modules/md-visualizer/App'), { ssr: false });

export default function MDVisualizerPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      <MDVisualizerApp />
    </div>
  );
}
