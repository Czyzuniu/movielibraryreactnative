import {Box, Button, Center, Flex, Heading, Text, useToast} from 'native-base';
import MoviePosterImage from '../MoviePosterImage';
import React from 'react';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import {useTranslation} from 'react-i18next';

type Props = {
  movie: DescriptiveMovie;
};

export default function MovieDetailsHeader({movie}: Props) {
  const {t} = useTranslation('viewMovie');
  const toast = useToast();

  const {poster, title, genres} = movie;

  return (
    <Flex direction={'row'}>
      <Center m={1} shadow={'1'} borderRadius={3}>
        <MoviePosterImage imagePath={poster} />
      </Center>
      <Box margin={1} shadow={'1'} borderRadius={3}>
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
        <Button
          margin={2}
          variant={'outline'}
          colorScheme="success"
          onPress={() =>
            toast.show({description: t('MovieAddedToFavourites', {title})})
          }>
          {t('AddToFavourites')}
        </Button>
      </Box>
    </Flex>
  );
}
