import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {LoggedInBottomNavigationTabParamList} from '../types';
import HomeStackNavigation from '../PopularMoviesStackNavigation';
import {useTheme} from 'native-base';
import BottomNavigationIcon from "../../base/presentation/components/BottomNavigationIcon";
import Account from "../../movie_library/presentation/screens/Account";
import Watchlist from "../../movie_library/presentation/screens/Watchlist";
import Favourites from "../../movie_library/presentation/screens/Favourites";
import FavouritesStack from "../FavouritesStack";

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
            <BottomNavigationIcon name={'film'} color={color}/>
          ),
          tabBarLabel: t('homeTabLabelTitle'),
        }}
        name="HomeStack"
        component={HomeStackNavigation}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <BottomNavigationIcon name={'heart'} color={color}/>
          ),
          tabBarLabel: t('Favourites'),
        }}
        name="FavouritesStack"
        component={FavouritesStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <BottomNavigationIcon name={'list'} color={color}/>
          ),
          tabBarLabel: t('Watchlist'),
        }}
        name="WatchlistStack"
        component={Watchlist}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <BottomNavigationIcon name={'user'} color={color}/>
          ),
          tabBarLabel: t('Account'),
        }}
        name="AccountStack"
        component={Account}
      />
    </Tab.Navigator>
  );
}
