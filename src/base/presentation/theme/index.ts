import {Appearance} from 'react-native';
import {extendTheme, themeTools} from 'native-base';

export default function AppTheme() {
  const colorScheme = Appearance.getColorScheme();
  return extendTheme({
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
}
