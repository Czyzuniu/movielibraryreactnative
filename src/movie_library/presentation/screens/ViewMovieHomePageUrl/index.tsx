import MovieWebsiteWebView from '../../components/MovieWebsiteWebView';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LoggedInStackParamList} from '../../../../navigation/types';

type Props = StackScreenProps<LoggedInStackParamList, 'ViewMovieHomePageWebView'>;

export default function ViewMovieHomePageUrl({route}: Props) {
  return <MovieWebsiteWebView source={{uri: route.params.movieUrl}} />;
}
