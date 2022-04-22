import React from 'react';

import {Box} from 'native-base';
import {myContainer} from '../../../../ioc/container';
import GetPopularMoviesUseCase from '../../../domain/usecase/GetPopularMoviesUseCase';
import {InjectableTypes} from '../../../../ioc/types';
import {useInfiniteQuery} from 'react-query';
import WaitSpinner from '../../../../base/presentation/components/waitspinner';
import {FlatList, RefreshControl} from 'react-native';
import PopularMovie from '../../components/popularmovie/PopularMovie';
import {MovieLibraryQueryKey} from '../../../consts/consts';

type Props = {};

const getPopularMovieUseCase = myContainer.get<GetPopularMoviesUseCase>(
  InjectableTypes.GetPopularMoviesUseCase,
);

export default function Home(props: Props) {
  const getPopularMovies = async ({pageParam = 1}) => {
    return getPopularMovieUseCase.execute(pageParam);
  };

  const {data, isLoading, refetch, fetchNextPage} = useInfiniteQuery(
    MovieLibraryQueryKey.GetPopularMovies,
    getPopularMovies,
    {
      onError: e => alert(e),
      retry: 0,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    },
  );

  return (
    <Box flex={1}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={{alignSelf: 'center'}}
        numColumns={3}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetchNextPage()}
        data={data?.pages.flat() || []}
        renderItem={({item}) => <PopularMovie movie={item} />}
        keyExtractor={item => item.id}
      />
      <WaitSpinner isVisible={isLoading} />
    </Box>
  );
}
