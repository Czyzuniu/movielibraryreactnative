import {FlatList, FlatListProps} from "react-native";
import React, {useCallback} from "react";
import SimplisticMovie from "../../../domain/entity/SimplisticMovie";
import MovieDto from "../../../infrastructure/models/MovieDto";
import MovieDtoToSimplisticMovieMapper from "../../../infrastructure/mappers/MovieDtoToSimplisticMovieMapper";
import MovieCard from "../MovieCard";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {HomeStackParamList} from "../../../../navigation/types";

type Props = {
  data: Array<MovieDto>
} & Pick<FlatListProps<MovieDto>, 'ListFooterComponent'>

export default function MovieVerticalCardList({data, ListFooterComponent}: Props) {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList, 'Home'>>();
  const renderPopularMovieItem = ({item}: { item: MovieDto }) => {
    const mapped = new MovieDtoToSimplisticMovieMapper().convert(item);
    return (
      <MovieCard movie={mapped} onPress={() => navigateToViewMovie(mapped)}/>
    )
  }

  const navigateToViewMovie = useCallback(
    (movie: SimplisticMovie) => {
      navigation.navigate('ViewMovie', {movieId: movie.id, title: movie.title});
    },
    [navigation],
  );

  return (
    <FlatList
      testID={'POPULAR_MOVIES_FLAT_LIST'}
      numColumns={3}
      data={data}
      renderItem={renderPopularMovieItem}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={ListFooterComponent}
    />
  )
}
