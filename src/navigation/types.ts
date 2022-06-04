import {StackNavigationProp} from "@react-navigation/stack";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type PopularMoviesStackParamList = {
  PopularMovies: undefined,
  Common: StackNavigationProp<CommonStackParamList>
}

type CreatedListsStackStackParamList = {
  MyLists: undefined,
  CreateList: undefined,
  Common: StackNavigationProp<CommonStackParamList>
}

type SettingsStackTypeParamList = {
  Settings: undefined
}

type LoggedInBottomNavigationTabParamList = {
  PopularMoviesStack: StackNavigationProp<PopularMoviesStackParamList>;
  CreatedListsStack: StackNavigationProp<CreatedListsStackStackParamList>;
  SettingsStack: StackNavigationProp<SettingsStackTypeParamList>;
};

type LoginStackParamList = {
  Login: undefined
}

type RootStackParamList = {
  LoggedOut: StackNavigationProp<LoginStackParamList>
  LoggedIn: BottomTabNavigationProp<LoggedInBottomNavigationTabParamList>;
};

type CommonStackParamList = {
  ViewMovie: {movieId: string; title: string};
  ViewMovieHomePageWebView: {movieUrl: string};
};

export {
  LoggedInBottomNavigationTabParamList,
  RootStackParamList,
  CommonStackParamList,
  PopularMoviesStackParamList,
  SettingsStackTypeParamList,
  LoginStackParamList,
  CreatedListsStackStackParamList
};
