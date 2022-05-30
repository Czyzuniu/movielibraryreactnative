import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import LoggedInBottomTabNavigation from './src/navigation/LoggedInBottomTabNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppTheme from './src/base/presentation/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import WaitSpinner from './src/base/presentation/components/WaitSpinner';
import {Provider} from "react-redux";
import store from "./src/redux/store/store";
import AuthStackNavigation from "./src/navigation/AuthStackNavigation";

export default function App() {
  const queryClient = new QueryClient();
  const {ready} = useTranslation();

  return (
  <Provider store={store}>
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
              <AuthStackNavigation />
            </NavigationContainer>
          )}
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  </Provider>
  );
}
