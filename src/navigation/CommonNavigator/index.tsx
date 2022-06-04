import ViewMovie from "../../movie_library/presentation/screens/ViewMovie";
import ViewMovieHomePageUrl from "../../movie_library/presentation/screens/ViewMovieHomePageUrl";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CommonStackParamList} from "../types";
import styles from "../LoggedInBottomTabNavigation/styles";

export default function CommonNavigator() {
  const navigationStyle = styles();
  const Stack = createStackNavigator<CommonStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
      }}>
      <Stack.Screen
        name="ViewMovie"
        component={ViewMovie}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="ViewMovieHomePageWebView"
        options={{
          headerTitle: '',
        }}
        component={ViewMovieHomePageUrl}
      />
    </Stack.Navigator>
  );
}
