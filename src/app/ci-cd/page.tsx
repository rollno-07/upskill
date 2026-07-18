'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CICDApp = dynamic(() => import('@/modules/ci-cd/App'), { ssr: false });

export default function CICDPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      <CICDApp />
    </div>
  );
}
