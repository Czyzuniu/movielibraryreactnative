type LoggedInBottomNavigationTabParamList = {
  HomeStack: undefined;
  FavouritesStack: undefined;
  WatchlistStack: undefined;
  AccountStack: undefined;
};

type HomeStackParamList = {
  Login: undefined
  Home: undefined;
  ViewMovie: {movieId: string; title: string};
  ViewMovieHomePageWebView: {movieUrl: string};
};

type FavouritesStackParamList = {
  Favourites: undefined
  ViewMovie: {movieId: string; title: string};
  ViewMovieHomePageWebView: {movieUrl: string};
};

export {LoggedInBottomNavigationTabParamList, HomeStackParamList, FavouritesStackParamList};
