import {Box, Center} from 'native-base';
import React from 'react';
import MovieBackdropImage from '../MovieBackdropImage';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import MovieDetailsHeader from '../MovieDetailsHeader';
import MovieBadgesRow from '../MovieBadgesRow';
import MovieOverview from '../MovieOverview';

type Props = {
  movie: DescriptiveMovie;
};

export default function MovieDetails({movie}: Props) {
  const {backdrop} = movie;

  return (
    <Box testID={`MOVIE_DETAILS_${movie.id}`} flex={1}>
      <MovieDetailsHeader movie={movie} />
      <MovieBadgesRow movie={movie} />
      <MovieOverview movie={movie} />
      <MovieBackdropImage imagePath={backdrop} />
    </Box>
  );
}
