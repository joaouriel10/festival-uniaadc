'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import { queryClient } from '@/infra/lib/react-query';

type ProvidersProps = {
  nounce: string;
  children: React.ReactNode;
};

export function Providers({ children, nounce }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig nonce={nounce}>{children}</MotionConfig>
    </QueryClientProvider>
  );
}
