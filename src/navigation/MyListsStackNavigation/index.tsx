import {useTranslation} from "react-i18next";
import styles from "../LoggedInBottomTabNavigation/styles";
import {createStackNavigator} from "@react-navigation/stack";
import {CreatedListsStackStackParamList} from "../types";
import React from "react";
import MyLists from "../../movie_library/presentation/screens/MyLists";
import CommonNavigator from "../CommonNavigator";
import CreateList from "../../movie_library/presentation/screens/CreateList";

export default function MyListsStackNavigation() {
  const {t} = useTranslation('navigation');
  const navigationStyle = styles();
  const Stack = createStackNavigator<CreatedListsStackStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: navigationStyle.headerTitleStyle,
        headerStyle: navigationStyle.headerStyle,
        headerTintColor: navigationStyle.headerTitleStyle.color,
      }}>
      <Stack.Screen
        name="MyLists"
        component={MyLists}
        options={{
          headerTitle: t('MyListsTabHeaderTitle'),
        }}
      />
      <Stack.Screen
        name="CreateList"
        component={CreateList}
        options={{
          headerTitle: t('MyListsTabHeaderTitle'),
        }}
      />
    </Stack.Navigator>
  );
}
