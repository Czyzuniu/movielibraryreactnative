import {NativeBaseProvider} from 'native-base';
import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppTheme from '../../src/base/presentation/theme';

export default function ContextWrapper({children}: {children: ReactNode}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
    },
  });
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider initialWindowMetrics={inset} theme={AppTheme()}>
        {children}
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
