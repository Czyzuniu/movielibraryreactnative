import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {LoggedInBottomNavigationTabParamList} from '../types';
import PopularMoviesStack from '../PopularMoviesStackNavigation';
import {useTheme} from 'native-base';
import BottomNavigationIcon from "../../base/presentation/components/BottomNavigationIcon";
import Settings from "../../movie_library/presentation/screens/Settings";
import MyListsStack from "../MyListsStackNavigation";

export default function LoggedInBottomTabNavigation() {
  const {t} = useTranslation('navigation');
  const {colors} = useTheme();
  const navigationStyle = styles();
  const Tab = createBottomTabNavigator<LoggedInBottomNavigationTabParamList>();

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
            <BottomNavigationIcon name={'globe'} color={color}/>
          ),
          tabBarLabel: t('ExploreTabLabelTitle'),
        }}
        name="PopularMoviesStack"
        component={PopularMoviesStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <BottomNavigationIcon name={'list'} color={color}/>
          ),
          tabBarLabel: t('MyListsTabLabelTitle'),
        }}
        name="CreatedListsStack"
        component={MyListsStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <BottomNavigationIcon name={'cog'} color={color}/>
          ),
          tabBarLabel: t('SettingsTabLabelTitle'),
        }}
        name="SettingsStack"
        component={Settings}
      />
    </Tab.Navigator>
  );
}
