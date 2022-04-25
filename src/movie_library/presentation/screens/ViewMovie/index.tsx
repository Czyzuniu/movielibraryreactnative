import React, {useEffect} from 'react';
import {ScrollView} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import {myContainer} from '../../../../ioc/container';
import {InjectableTypes} from '../../../../ioc/types';
import {useQuery} from 'react-query';
import {MovieLibraryQueryKey} from '../../../consts/consts';
import GetMovieByIdUseCase from '../../../domain/usecase/GetMovieByIdUseCase';
import MovieDetails from '../../components/MovieDetails';
import {Alert, RefreshControl} from 'react-native';

type Props = StackScreenProps<HomeStackParamList, 'ViewMovie'>;

export default function ViewMovie({navigation, route}: Props) {
  const getMovieByIdUseCase = myContainer.get<GetMovieByIdUseCase>(
    InjectableTypes.GetMovieByIdUseCase,
  );

  const {movieId} = route.params;
  const {data, isFetching, refetch} = useQuery(
    `${MovieLibraryQueryKey.GetMovieById}_${movieId}`,
    () => getMovieByIdUseCase.execute(movieId),
    {
      onError: (e: any) => Alert.alert(e.message),
      retry: 0,
    },
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title,
    });
  }, [navigation, data]);

  return (
    <ScrollView
      testID={'VIEW_MOVIE_SCROLL'}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }>
      {data && <MovieDetails movie={data} />}
    </ScrollView>
  );
}
