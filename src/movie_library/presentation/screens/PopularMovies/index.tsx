import React, {useEffect, useState} from 'react';

import {Box, Button, Center} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import SearchBar from '../../../../base/presentation/components/SearchBar';
import LanguageModal from '../../../../base/presentation/components/LanguageModal';
import {useGetPopularMoviesQuery} from "../../../../redux/services/movies";
import MovieDto from "../../../infrastructure/models/MovieDto";
import MovieVerticalCardList from "../../components/MovieVerticalCardList";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

export default function PopularMovies({navigation}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {
    data = {
      results: []
    }, isFetching
  } = useGetPopularMoviesQuery(page)
  const [items, setItems] = useState<Array<MovieDto>>(data?.results || []);

  useEffect(() => {
    if (data.results.length) {
      const hasDuplicate = items.find(movie => movie.id === data.results[0].id);
      if (hasDuplicate) {
        setItems(data.results)
      } else {
        setItems(items.concat(data.results))
      }
    }
  }, [data])

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
        <MovieVerticalCardList data={items} ListFooterComponent={() => {
          if (items.length) {
            return (
              <Center flex={0.2} m={5}>
                <Button
                  variant={'solid'}
                  isLoading={isFetching}
                  spinnerPlacement="end"
                  onPress={() => {
                    setPage(page + 1)
                  }}
                  leftIcon={<Icon name={'chevron-circle-down'} color={'white'}/>} w={250}>Load more...
                </Button>
              </Center>
            )
          }
          return null
        }}/>
      </Box>
      <LanguageModal/>
    </Box>
  );
}
