import {Box, Pressable} from 'native-base';
import React from 'react';
import SimplisticMovie from '../../../domain/entity/SimplisticMovie';
import MoviePosterImage from '../MoviePosterImage';

type Props = {
  movie: SimplisticMovie;
  onPress: () => void;
};

function MovieCard({movie, onPress}: Props) {
  return (
    <Pressable onPress={onPress} testID={'MOVIE_CARD_' + movie.id}>
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
            <MoviePosterImage
              imagePath={movie.poster}
              resizeMode={'cover'}
              width={120}
              height={200}
            />
          </Box>
        );
      }}
    </Pressable>
  );
}

export default React.memo(MovieCard);
