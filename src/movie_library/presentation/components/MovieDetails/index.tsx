import {Box, Button} from 'native-base';
import React from 'react';
import MovieBackdropImage from '../MovieBackdropImage';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import MovieDetailsHeader from '../MovieDetailsHeader';
import MovieBadgesRow from '../MovieBadgesRow';
import MovieOverview from '../MovieOverview';
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {StackNavigationProp} from "@react-navigation/stack";
import {HomeStackParamList} from "../../../../navigation/types";

type Props = {
  movie: DescriptiveMovie;
};

export default function MovieDetails({movie}: Props) {
  const {backdrop, homepageUrl} = movie;
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'ViewMovie'>>();
  const { t } = useTranslation()

  return (
    <Box testID={`MOVIE_DETAILS_${movie.id}`} flex={1}>
      <MovieDetailsHeader movie={movie} type={'movie'} />
      <MovieBadgesRow movie={movie} />
      <MovieOverview movie={movie} />
      <MovieBackdropImage imagePath={backdrop} />
      <Button
        margin={2}
        variant={'outline'}
        colorScheme="success"
        onPress={() =>
          navigation.navigate('ViewMovieHomePageWebView', {
            movieUrl: homepageUrl,
          })
        }>
        {t('MovieGoWebsite')}
      </Button>
    </Box>
  );
}
