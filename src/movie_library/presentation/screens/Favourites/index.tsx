import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import {Box} from "native-base";
import {useGetFavouriteMoviesQuery} from "../../../../redux/services/movies";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import MovieVerticalCardList from "../../components/MovieVerticalCardList";
import WaitSpinner from "../../../../base/presentation/components/WaitSpinner";

type Props = StackScreenProps<HomeStackParamList, 'ViewMovieHomePageWebView'>;

export default function Favourites({route}: Props) {
  const { data = {
    results: []
  }, isLoading } = useGetFavouriteMoviesQuery(useAppSelector(state => state.session.user.username))

  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <MovieVerticalCardList data={data.results} />
      <WaitSpinner isVisible={isLoading} />
    </Box>
  )
}
