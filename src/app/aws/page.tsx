'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AWSApp = dynamic(() => import('@/modules/aws/App'), { ssr: false });

export default function AWSPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      <AWSApp />
    </div>
  );
}
