import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigation from './src/navigation/BottomNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppTheme from './src/base/presentation/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import WaitSpinner from './src/base/presentation/components/WaitSpinner';

export default function App() {
  const queryClient = new QueryClient();
  const {ready} = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={AppTheme()}>
        <SafeAreaProvider
          initialSafeAreaInsets={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {!ready ? (
            <WaitSpinner isVisible={true} />
          ) : (
            <NavigationContainer>
              <BottomTabNavigation />
            </NavigationContainer>
          )}
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
