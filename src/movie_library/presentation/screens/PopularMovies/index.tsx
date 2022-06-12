import React, {useState} from 'react';

import {Box, Center} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import SearchBar from '../../../../base/presentation/components/SearchBar';
import {useGetPopularMoviesQuery} from "../../../../redux/services/movies";
import MovieVerticalCardList from "../../components/MovieVerticalCardList";
import {PopularMoviesStackParamList} from "../../../../navigation/types";

type Props = StackScreenProps<PopularMoviesStackParamList, 'PopularMovies'>;

export default function PopularMovies({navigation}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {
    data = {
      results: [],
      page: 1,
      total_pages: 0,
      total_results: 0
    }, isFetching
  } = useGetPopularMoviesQuery(page)

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
      <Box flex={0.9}>
        <MovieVerticalCardList data={data} page={page} onLoadMore={() => setPage(page + 1)} isFetching={isFetching} />
      </Box>
    </Box>
  );
}
