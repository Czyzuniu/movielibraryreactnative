import {Box, Image} from 'native-base';
import React from 'react';
import Movie from '../../../domain/entity/Movie';
import Config from 'react-native-config';

type Props = {
  movie: Movie;
};

const {API_IMAGE_URL} = Config;

export default function PopularMovie({movie}: Props) {
  return (
    <Box margin={1.5}>
      <Image
        resizeMode={'cover'}
        width={120}
        height={200}
        source={{uri: `${API_IMAGE_URL}/w500/${movie.poster}`}}
        alt={'image'}
      />
    </Box>
  );
}
