import {Center, Heading, HStack, Text, VStack} from 'native-base';
import MoviePosterImage from '../MoviePosterImage';
import React from 'react';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import ToggleAsFavouriteButton from "../AddToFavouritesButton";

type Props = {
  movie: DescriptiveMovie;
  type: 'movie' | 'tv'
};

export default function MovieDetailsHeader({movie: { poster, title, genres, id }, type}: Props) {
  return (
    <HStack m={2}>
      <Center flex={0.5}>
        <MoviePosterImage imagePath={poster} />
      </Center>
      <VStack flex={0.5} justifyContent={'space-between'}>
        <Center>
          <Heading textAlign={'center'} size={'md'}>
            {title}
          </Heading>
        </Center>
        <Center>
          {genres.map(q => {
            return <Text key={q.id}>{q.name}</Text>;
          })}
        </Center>
        <ToggleAsFavouriteButton movieId={parseInt(id)} type={type} />
      </VStack>
    </HStack>
  );
}
