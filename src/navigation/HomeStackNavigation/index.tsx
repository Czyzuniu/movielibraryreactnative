import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../movie_library/presentation/screens/Home';
import ViewMovie from '../../movie_library/presentation/screens/ViewMovie';
import {HomeStackParamList} from '../types';
import React from 'react';
import styles from '../BottomNavigation/styles';

export default function HomeStackNavigation() {
  const navigationStyle = styles();
  const Stack = createStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ViewMovie"
        component={ViewMovie}
        options={({route}) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
}
