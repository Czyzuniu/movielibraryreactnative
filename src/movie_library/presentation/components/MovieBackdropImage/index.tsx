import React from 'react';
import MovieImage from '../MovieImage';

type Props = {
  imagePath?: string;
};

export default function MovieBackdropImage({imagePath}: Props) {
  return (
    <MovieImage
      resizeMode={'cover'}
      width={'full'}
      height={'3xs'}
      path={imagePath}
      alt={'movie-backdrop-image'}
    />
  );
}
