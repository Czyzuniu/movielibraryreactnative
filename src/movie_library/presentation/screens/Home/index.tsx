import React, {useCallback, useEffect, useState} from 'react';

import {Box, Center, Spinner} from 'native-base';
import {myContainer} from '../../../../ioc/container';
import GetPopularMoviesUseCase from '../../../domain/usecase/GetPopularMoviesUseCase';
import {InjectableTypes} from '../../../../ioc/types';
import {useInfiniteQuery} from 'react-query';
import {Alert, FlatList, RefreshControl} from 'react-native';
import MovieCard from '../../components/MovieCard';
import {MovieLibraryQueryKey} from '../../../consts/consts';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import SimplisticMovie from '../../../domain/entity/SimplisticMovie';
import SearchBar from '../../../../base/presentation/components/SearchBar';
import LanguageModal from '../../../../base/presentation/components/LanguageModal';

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

export default function Home({navigation}: Props) {
  const getPopularMovieUseCase = myContainer.get<GetPopularMoviesUseCase>(
    InjectableTypes.GetPopularMoviesUseCase,
  );

  const [search, setSearch] = useState('');

  const getPopularMovies = async ({pageParam = 1}) => {
    return getPopularMovieUseCase.execute(pageParam, search);
  };

  const {data, refetch, fetchNextPage, isFetching} = useInfiniteQuery(
    MovieLibraryQueryKey.GetPopularMovies,
    getPopularMovies,
    {
      onError: (e: any) => Alert.alert(e.message),
      retry: 0,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    },
  );

  const navigateToViewMovie = useCallback(
    (movie: SimplisticMovie) => {
      navigation.navigate('ViewMovie', {movieId: movie.id, title: movie.title});
    },
    [navigation],
  );

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  return (
    <Box
      _light={{
        backgroundColor: 'white.300',
      }}
      _dark={{
        backgroundColor: 'muted.800',
      }}>
      <Center flex={0.1} m={1.5}>
        <SearchBar onSearch={setSearch} />
      </Center>
      <Box flex={0.9}>
        <FlatList
          testID={'POPULAR_MOVIES_FLAT_LIST'}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          contentContainerStyle={{alignSelf: 'center'}}
          numColumns={3}
          onEndReachedThreshold={0.1}
          onEndReached={() => fetchNextPage()}
          data={data?.pages.flat() || []}
          renderItem={({item}) => (
            <MovieCard movie={item} onPress={() => navigateToViewMovie(item)} />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={() =>
            isFetching ? <Spinner size={'lg'} color={'secondary.100'} /> : null
          }
        />
      </Box>
      <LanguageModal />
    </Box>
  );
}
