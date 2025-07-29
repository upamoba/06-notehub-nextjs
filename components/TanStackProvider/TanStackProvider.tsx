'use client';
import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  dehydratedState?: unknown;
}
export const TanStackProvider: FC<Props> = ({ children, dehydratedState }) => (
  <QueryClientProvider client={queryClient}>
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  </QueryClientProvider>
);
