import React from 'react';
import {ScrollView} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import {myContainer} from '../../../../ioc/container';
import {InjectableTypes} from '../../../../ioc/types';
import {useQuery} from 'react-query';
import {MovieLibraryQueryKey} from '../../../consts/consts';
import GetMovieByIdUseCase from '../../../domain/usecase/GetMovieByIdUseCase';
import MovieDetails from '../../components/MovieDetails';
import {RefreshControl} from 'react-native';

type Props = StackScreenProps<HomeStackParamList, 'ViewMovie'>;

const getMovieByIdUseCase = myContainer.get<GetMovieByIdUseCase>(
  InjectableTypes.GetMovieByIdUseCase,
);

export default function ViewMovie({route}: Props) {
  const {movieId} = route.params;
  const {data, isFetching, refetch} = useQuery(
    `${MovieLibraryQueryKey.GetMovieById}_${movieId}`,
    () => getMovieByIdUseCase.execute(movieId),
    {
      onError: e => alert(e),
      retry: 0,
    },
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {data && <MovieDetails movie={data} />}
    </ScrollView>
  );
}
