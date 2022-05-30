import {useTranslation} from "react-i18next";
import styles from "../LoggedInBottomTabNavigation/styles";
import {createStackNavigator} from "@react-navigation/stack";
import {FavouritesStackParamList} from "../types";
import ViewMovie from "../../movie_library/presentation/screens/ViewMovie";
import React from "react";
import Favourites from "../../movie_library/presentation/screens/Favourites";

export default function FavouritesStack() {
  const {t} = useTranslation('navigation');
  const navigationStyle = styles();
  const Stack = createStackNavigator<FavouritesStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
      }}>
      <Stack.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerTitle: t('homeTabHeaderTitle'),
        }}
      />
      <Stack.Screen
        name="ViewMovie"
        component={ViewMovie}
        options={({route}) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
}
