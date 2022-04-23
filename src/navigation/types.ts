import SimplisticMovie from '../movie_library/domain/entity/SimplisticMovie';

type RootBottomNavigationParamList = {
  HomeRootStack: undefined;
  FavouritesRootStack: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  ViewMovie: {movieId: string; title: string};
};

export {RootBottomNavigationParamList, HomeStackParamList};
