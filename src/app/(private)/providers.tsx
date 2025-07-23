'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/infra/lib/react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
