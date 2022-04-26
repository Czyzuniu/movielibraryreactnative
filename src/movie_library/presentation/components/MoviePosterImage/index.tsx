import React from 'react';
import MovieImage from '../MovieImage';
import {IImageProps} from 'native-base';

type Props = {
  imagePath?: string;
} & IImageProps;

export default function MoviePosterImage({
  imagePath,
  width = 300,
  height = 300,
  resizeMode = 'contain',
}: Props) {
  return (
    <MovieImage
      path={imagePath}
      resizeMode={resizeMode}
      width={width}
      height={height}
      alt={'movie-poster'}
      borderRadius={3}
    />
  );
}
