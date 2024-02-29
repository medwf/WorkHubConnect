"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: { id: string };
}

const WorkerId: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className='w-full h-full flex justify-center items-center'>
      {id}
    </div>
  );
};

export default WorkerId;
