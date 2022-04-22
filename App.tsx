import React from 'react';
import {extendTheme, NativeBaseProvider, themeTools} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import Index from './src/navigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Appearance} from 'react-native';

export default function App() {
  const queryClient = new QueryClient();
  const colorScheme = Appearance.getColorScheme();

  const theme = extendTheme({
    colors: {
      primary: {
        100: '#262833',
      },
    },
    fontConfig: {
      Roboto: {
        100: {
          normal: 'Roboto-Light',
          italic: 'Roboto-LightItalic',
        },
        200: {
          normal: 'Roboto-Light',
          italic: 'Roboto-LightItalic',
        },
        300: {
          normal: 'Roboto-Light',
          italic: 'Roboto-LightItalic',
        },
        400: {
          normal: 'Roboto-Regular',
          italic: 'Roboto-Italic',
        },
        500: {
          normal: 'Roboto-Medium',
        },
        600: {
          normal: 'Roboto-Medium',
          italic: 'Roboto-MediumItalic',
        },
      },
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
      mono: 'Roboto',
    },
    components: {
      Box: {
        baseStyle: () => {
          return {
            background: themeTools.mode(
              'white.300',
              'primary.100',
            )({colorMode: colorScheme}),
          };
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
          <Index />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
