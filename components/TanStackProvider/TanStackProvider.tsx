'use client';
import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider, hydrate as Hydrate  } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Props { children: ReactNode; dehydratedState?: unknown; }
export const TanStackProvider: FC<Props> = ({ children, dehydratedState }) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>{children}</Hydrate>
  </QueryClientProvider>
);
