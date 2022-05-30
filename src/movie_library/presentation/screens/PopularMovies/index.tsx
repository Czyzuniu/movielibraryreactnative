import React, {useCallback, useEffect, useState} from 'react';

import {Box, Center, Spinner} from 'native-base';
import {FlatList, RefreshControl} from 'react-native';
import MovieCard from '../../components/MovieCard';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import SimplisticMovie from '../../../domain/entity/SimplisticMovie';
import SearchBar from '../../../../base/presentation/components/SearchBar';
import LanguageModal from '../../../../base/presentation/components/LanguageModal';
import {useGetPopularMoviesQuery} from "../../../../redux/services/movies";
import MovieDtoToSimplisticMovieMapper from "../../../infrastructure/mappers/MovieDtoToSimplisticMovieMapper";

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

export default function PopularMovies({navigation}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isPullingToRefresh, setIsPullingToRefresh] = useState(false);
  const {refetch, data, isFetching} = useGetPopularMoviesQuery(page)
  const [items, setItems] = useState(data?.results || []);

  const navigateToViewMovie = useCallback(
    (movie: SimplisticMovie) => {
      navigation.navigate('ViewMovie', {movieId: movie.id, title: movie.title});
    },
    [navigation],
  );

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  useEffect(() => {
    setItems(items.concat(data?.results || []))
  }, [data])

  useEffect(() => {
    if (isPullingToRefresh) {
      refetch()
      setIsPullingToRefresh(false)
    }
  }, [isPullingToRefresh]);

  return (
    <Box
      _light={{
        backgroundColor: 'white.300',
      }}
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <Center flex={0.1} m={1.5}>
        <SearchBar onSearch={setSearch}/>
      </Center>
      <Box flex={0.9} >
        <FlatList
          testID={'POPULAR_MOVIES_FLAT_LIST'}
          refreshControl={
            <RefreshControl refreshing={isPullingToRefresh} onRefresh={() => setIsPullingToRefresh(true)}/>
          }
          numColumns={3}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.1}
          data={items}
          renderItem={({item}) => {
            const mapped = new MovieDtoToSimplisticMovieMapper().convert(item);
            return (
              <MovieCard movie={mapped} onPress={() => navigateToViewMovie(mapped)}/>
            )
          }}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() =>
            isFetching && data ? (
              <Spinner size={'lg'} color={'secondary.100'}/>
            ) : null
          }
        />
      </Box>
      <LanguageModal/>
    </Box>
  );
}
