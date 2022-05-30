import {Box, Button, Center, Flex, Heading, HStack, Text, VStack} from 'native-base';
import MoviePosterImage from '../MoviePosterImage';
import React from 'react';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';

type Props = {
  movie: DescriptiveMovie;
};

export default function MovieDetailsHeader({movie}: Props) {
  const {t} = useTranslation('viewMovie');
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'ViewMovie'>>();

  const {poster, title, genres, homepageUrl} = movie;

  return (
    <HStack m={2}>
      <Center flex={0.5}>
        <MoviePosterImage imagePath={poster} />
      </Center>
      <VStack flex={0.5} justifyContent={'space-around'}>
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
            navigation.navigate('ViewMovieHomePageWebView', {
              movieUrl: homepageUrl,
            })
          }>
          {t('MovieGoWebsite')}
        </Button>
      </VStack>
    </HStack>
  );
}
