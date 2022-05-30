import {StyleSheet} from 'react-native';
import {useTheme} from 'native-base';

export default function Styles() {
  const {colors, fonts} = useTheme();

  return StyleSheet.create({
    headerTitleStyle: {
      color: colors.amber['500'],
      fontFamily: fonts.heading,
      fontSize: 18,
    },
    headerStyle: {
      backgroundColor: colors.muted['800'],
    },
    tabBarStyle: {
      backgroundColor: colors.muted['800'],
    },
    tabBarLabelStyle: {
      fontFamily: fonts.heading,
      fontSize: 12,
      fontWeight: '500',
    },
  });
}
