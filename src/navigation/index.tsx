import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Browse from '../movie_library/presentation/screens/browse';
import Favourites from '../movie_library/presentation/screens/favourites';
import Home from '../movie_library/presentation/screens/home';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'native-base';

export default function Index() {
  const {t} = useTranslation('navigation');

  const {colors, fonts} = useTheme();

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: colors.amber['500'],
          fontFamily: fonts.heading,
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: colors.primary['100'],
        },
        tabBarStyle: {
          backgroundColor: colors.primary['100'],
        },
        tabBarLabelStyle: {
          color: colors.amber['500'],
          fontFamily: fonts.heading,
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon color={colors.amber['500']} size={15} name={'home'} />
          ),
          headerTitle: t('home'),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon color={colors.amber['500']} size={15} name={'search'} />
          ),
        }}
        name="Browse"
        component={Browse}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon color={colors.amber['500']} size={15} name={'heart'} />
          ),
        }}
        name="Favourites"
        component={Favourites}
      />
    </Tab.Navigator>
  );
}
