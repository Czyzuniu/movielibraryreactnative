import React, {useEffect} from 'react';
import {ScrollView} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {LoggedInStackParamList} from '../../../../navigation/types';
import MovieDetails from '../../components/MovieDetails';
import {RefreshControl} from 'react-native';
import {useGetMovieByIdQuery} from "../../../../redux/services/movies";
import WaitSpinner from "../../../../base/presentation/components/WaitSpinner";
import MovieDtoToDescriptiveMovieMapper from "../../../infrastructure/mappers/MovieDtoToDescriptiveMovieMapper";

type Props = StackScreenProps<LoggedInStackParamList, 'ViewMovie'>;

export default function ViewMovie({navigation, route}: Props) {
  const {movieId} = route.params;
  const {data, isFetching, refetch, error, isLoading } = useGetMovieByIdQuery(movieId)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title,
    });
  }, [navigation, data]);

  if (isLoading) {
    return <WaitSpinner isVisible />
  }

  return (
    <ScrollView
      testID={'VIEW_MOVIE_SCROLL'}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {data && <MovieDetails movie={new MovieDtoToDescriptiveMovieMapper().convert(data)} />}
    </ScrollView>
  );
}
