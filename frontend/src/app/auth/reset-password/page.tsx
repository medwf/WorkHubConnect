"use client"
import ResetPassword from '@/components/auth/reset';
import React, { Suspense } from 'react';



export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />

    </Suspense>
  );
}
