'use client';
import React, { FC, ReactNode, useState, } from 'react';
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query';

interface TanStackProviderProps {
  children: ReactNode;
}

export const TanStackProvider: FC<TanStackProviderProps> = ({ children }) => {
  const [queryClient] =  useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default TanStackProvider;