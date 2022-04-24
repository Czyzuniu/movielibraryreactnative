import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favourites from '../../movie_library/presentation/screens/Favourites';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import NavigationTabIcon from '../../base/presentation/components/NavigationTabIcon';
import {RootBottomNavigationParamList} from '../types';
import HomeStackNavigation from '../HomeStackNavigation';
import {useTheme} from 'native-base';

export default function BottomTabNavigation() {
  const {t} = useTranslation('navigation');
  const {colors} = useTheme();
  const navigationStyle = styles();
  const Tab = createBottomTabNavigator<RootBottomNavigationParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: navigationStyle.tabBarStyle,
        tabBarLabelStyle: navigationStyle.tabBarLabelStyle,
        tabBarActiveTintColor: colors.amber['500'],
        tabBarInactiveTintColor: colors.black['100'],
        tabBarInactiveBackgroundColor: colors.black['900'],
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <NavigationTabIcon name={'film'} color={color} />
          ),
          tabBarLabel: t('homeTabLabelTitle'),
        }}
        name="HomeRootStack"
        component={HomeStackNavigation}
      />
    </Tab.Navigator>
  );
}
