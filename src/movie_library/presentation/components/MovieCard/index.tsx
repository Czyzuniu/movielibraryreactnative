import {Box, Image, Pressable} from 'native-base';
import React from 'react';
import SimplisticMovie from '../../../domain/entity/SimplisticMovie';
import Config from 'react-native-config';

type Props = {
  movie: SimplisticMovie;
  onPress: () => void;
};

const {API_IMAGE_URL} = Config;

function MovieCard({movie, onPress}: Props) {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => {
        return (
          <Box
            margin={1.5}
            opacity={isPressed ? 0.5 : 1}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}>
            {movie.poster && (
              <Image
                resizeMode={'cover'}
                width={120}
                height={200}
                source={{uri: `${API_IMAGE_URL}/w500/${movie.poster}`}}
                alt={'image'}
              />
            )}
          </Box>
        );
      }}
    </Pressable>
  );
}

export default React.memo(MovieCard);
