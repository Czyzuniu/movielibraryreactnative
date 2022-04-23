import React from 'react';
import {
  extendTheme,
  NativeBaseProvider,
  themeTools,
  useTheme,
} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './src/navigation/BottomNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Appearance} from 'react-native';

export default function App() {
  const queryClient = new QueryClient();
  const colorScheme = Appearance.getColorScheme();

  const theme = extendTheme({
    components: {
      Box: {
        defaultProps: {
          flex: 1,
        },
      },
      ScrollView: {
        baseStyle: () => {
          return {
            background: themeTools.mode(
              'white.300',
              'muted.800',
            )({colorMode: colorScheme}),
          };
        },
        defaultProps: {
          contentContainerStyle: {
            flexGrow: 1,
          },
        },
      },
    },
    config: {
      initialColorMode: 'dark',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <BottomNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
