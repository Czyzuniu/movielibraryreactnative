import {FlatList} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SimplisticMovie from "../../../domain/entity/SimplisticMovie";
import MovieDto from "../../../infrastructure/models/MovieDto";
import MovieDtoToSimplisticMovieMapper from "../../../infrastructure/mappers/MovieDtoToSimplisticMovieMapper";
import MovieCard from "../MovieCard";
import {useNavigation} from "@react-navigation/native";
import LoadMoreButton from "../LoadMoreButton";
import {MovieResponse, MoviesResponse} from "../../../../types/api/types";
import {StackNavigationProp} from "@react-navigation/stack";
import {PopularMoviesStackParamList} from "../../../../navigation/types";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

type Props = {
  data: MoviesResponse
  isFetching: boolean
  page: number
  onLoadMore: () => void
}

export default function MovieVerticalCardList({data: { results, total_results, total_pages }, isFetching, page, onLoadMore }: Props) {
  const navigation = useNavigation<any>();

  const [items, setItems] = useState<Array<MovieResponse>>(results);

  useEffect(() => {
    if (results.length) {
      const hasDuplicate = items.find(movie => movie.id === results[0].id);
      if (hasDuplicate) {
        setItems(results)
      } else {
        setItems(items.concat(results))
      }
    }
  }, [results])

  const renderPopularMovieItem = ({item}: { item: MovieDto }) => {
    const mapped = new MovieDtoToSimplisticMovieMapper().convert(item);
    return (
      <MovieCard movie={mapped} onPress={() => navigateToViewMovie(mapped)}/>
    )
  }

  const navigateToViewMovie = useCallback(
    (movie: SimplisticMovie) => {
      navigation.navigate('Common', {
        screen: 'ViewMovie',
        params: {movieId: movie.id, title: movie.title}
      });
    },
    [navigation],
  );

  return (
    <FlatList
      testID={'POPULAR_MOVIES_FLAT_LIST'}
      numColumns={3}
      data={items}
      renderItem={renderPopularMovieItem}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={() => {
        if (items.length) {
          if (page < total_pages) {
            return (
              <LoadMoreButton isFetching={isFetching} onPress={onLoadMore} />
            )
          }
        }
        return null
      }}
    />
  )
}
