type RootBottomNavigationParamList = {
  HomeRootStack: undefined;
  FavouritesRootStack: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  ViewMovie: {movieId: string; title: string};
  ViewMovieHomePageWebView: {movieUrl: string};
};

export {RootBottomNavigationParamList, HomeStackParamList};
