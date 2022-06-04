import {createStackNavigator} from '@react-navigation/stack';
import PopularMovies from '../../movie_library/presentation/screens/PopularMovies';
import {PopularMoviesStackParamList} from '../types';
import React from 'react';
import styles from '../LoggedInBottomTabNavigation/styles';
import {useTranslation} from 'react-i18next';
import CommonNavigator from "../CommonNavigator";

export default function PopularMoviesStack() {
  const {t} = useTranslation('navigation');
  const navigationStyle = styles();

  const Stack = createStackNavigator<PopularMoviesStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
      }}>
      <Stack.Screen
        name="PopularMovies"
        component={PopularMovies}
        options={{
          headerTitle: t('ExploreTabHeaderTitle'),
        }}
      />
      <Stack.Screen name={'Common'} options={{headerShown:false}}  component={CommonNavigator}/>
    </Stack.Navigator>
  );
}
