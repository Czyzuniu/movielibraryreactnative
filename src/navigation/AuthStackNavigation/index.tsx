import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import React from 'react';
import styles from '../LoggedInBottomTabNavigation/styles';
import {useTranslation} from 'react-i18next';
import Login from "../../movie_library/presentation/screens/Login";
import LoggedInBottomTabNavigation from "../LoggedInBottomTabNavigation";
import {useAppSelector} from "../../redux/hooks/hooks";

export default function AuthStackNavigation() {
  const isSignedIn = useAppSelector(state => state.session.sessionId !== null)
  const {t} = useTranslation('navigation');
  const navigationStyle = styles();
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
        headerShown: false
      }}>
      { isSignedIn ? (
        <>
          <Stack.Screen
            name="LoggedIn"
            component={LoggedInBottomTabNavigation}
            options={{
              headerTitle: t('HomeTabHeaderTitle'),
              animationTypeForReplace: 'push'
            }}
          />
        </>
      ): (
        <Stack.Screen
          name="LoggedOut"
          options={{
            animationTypeForReplace: 'pop'
          }}
          component={Login}
        />
      )}

    </Stack.Navigator>
  );
}
