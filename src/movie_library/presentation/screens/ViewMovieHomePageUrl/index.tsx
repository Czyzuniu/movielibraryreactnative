import MovieWebsiteWebView from '../../components/MovieWebsiteWebView';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';

type Props = StackScreenProps<HomeStackParamList, 'ViewMovieHomePageWebView'>;

export default function ViewMovieHomePageUrl({route}: Props) {
  return <MovieWebsiteWebView source={{uri: route.params.movieUrl}} />;
}
