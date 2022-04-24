import {IImageProps, Image} from 'native-base';
import React from 'react';
import Config from 'react-native-config';

const {API_IMAGE_URL} = Config;

type Props = IImageProps & {
  path?: string;
};

export default function MovieImage(props: Props) {
  const {path} = props;

  const imageUrl = path
    ? `${API_IMAGE_URL}/w500/${path}`
    : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

  return (
    <Image {...props} testID={`TEST_IMAGE_${path}`} source={{uri: imageUrl}} />
  );
}
