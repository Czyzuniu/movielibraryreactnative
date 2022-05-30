import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from '../types';
import React from 'react';
import styles from '../LoggedInBottomTabNavigation/styles';
import {useTranslation} from 'react-i18next';
import Login from "../../movie_library/presentation/screens/Login";
import LoggedInBottomTabNavigation from "../LoggedInBottomTabNavigation";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks";

export default function AuthStackNavigation() {
  const isSignedIn = useAppSelector(state => state.session.sessionId !== null)
  const {t} = useTranslation('navigation');
  const navigationStyle = styles();
  const Stack = createStackNavigator<HomeStackParamList>();
  const dispatch = useAppDispatch();

  // if (isSignedIn) {
  //   trigger().then(({ data }) => {
  //     if (data) {
  //       dispatch(setAccountDetails({
  //         username: data.username
  //       }))
  //     }
  //   })
  //
  // }


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
            name="Home"
            component={LoggedInBottomTabNavigation}
            options={{
              headerTitle: t('homeTabHeaderTitle'),
            }}
          />
        </>
      ): (
        <Stack.Screen
          name="Login"
          component={Login}
        />
      )}

    </Stack.Navigator>
  );
}
