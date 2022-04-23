import {Image} from 'native-base';
import React from 'react';
import Config from 'react-native-config';

type Props = {
  imagePath: string;
};

const {API_IMAGE_URL} = Config;

export default function MovieBackdropImage({imagePath}: Props) {
  return (
    <Image
      resizeMode={'cover'}
      width={'full'}
      height={'3xs'}
      source={{uri: `${API_IMAGE_URL}/w500/${imagePath}`}}
      alt={'image'}
    />
  );
}
