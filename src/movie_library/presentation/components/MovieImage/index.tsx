import {IImageProps, Image} from 'native-base';
import React from 'react';
import Config from 'react-native-config';
import {DEFAULT_POSTER_DOWNLOAD_SIZE, NO_POSTER_IMAGE_URL,} from '../../../consts/consts';

const {API_IMAGE_URL} = Config;

type Props = IImageProps & {
  path?: string;
};

export default function MovieImage(props: Props) {
  const {path} = props;

  const imageUrl = path
    ? `${API_IMAGE_URL}/w${DEFAULT_POSTER_DOWNLOAD_SIZE}/${path}`
    : NO_POSTER_IMAGE_URL;

  return (
    <Image {...props} testID={`TEST_IMAGE_${path}`} source={{uri: imageUrl}} />
  );
}
