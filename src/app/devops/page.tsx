'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DevOpsApp = dynamic(() => import('@/modules/devops/App'), { ssr: false });

export default function DevOpsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      <DevOpsApp />
    </div>
  );
}
