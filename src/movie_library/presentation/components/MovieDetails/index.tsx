import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useTheme,
  useToast,
} from 'native-base';
import React from 'react';
import Config from 'react-native-config';
import MovieBackdropImage from '../MovieBackdropImage';
import dayjs from 'dayjs';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieInfoBadge from '../MovieInfoBadge';
import CoreMapper from '../../../../base/mapper/CoreMapper';
import {useTranslation} from 'react-i18next';

type Props = {
  movie: DescriptiveMovie;
};

const {API_IMAGE_URL} = Config;

export default function MovieDetails({movie}: Props) {
  const {backdrop, poster, title, overview, releaseDate, genres} = movie;
  const {colors} = useTheme();
  const {t} = useTranslation('viewMovie');

  const toast = useToast();

  return (
    <Box>
      <Flex direction={'row'}>
        <Center>
          <Image
            resizeMode={'contain'}
            width={300}
            height={300}
            source={{uri: `${API_IMAGE_URL}/w500/${poster}`}}
            alt={'image'}
          />
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
            }
            leftIcon={<Icon name={'heart'} size={20} />}>
            {t('AddToFavourites')}
          </Button>
        </Box>
      </Flex>
      <Box margin={2} shadow={'9'} borderRadius={3}>
        <Box height={'80px'} margin={1.5}>
          <Flex direction={'row'}>
            <MovieInfoBadge
              mainText={CoreMapper.numberToString(movie.averageVote)}
              secondaryText={t('TotalVotes', {
                total: CoreMapper.numberToString(movie.totalVotes),
              })}
              icon={<Icon name={'star'} color={colors.amber['600']} />}
            />
            <MovieInfoBadge
              mainText={t('RuntimeMin', {minutes: movie.runTime})}
              secondaryText={'Runtime'}
              icon={<Icon name={'clock-o'} color={colors.amber['600']} />}
            />
            <MovieInfoBadge
              mainText={dayjs(releaseDate).format('MMM, D YYYY')}
              secondaryText={t('ReleaseDate')}
              icon={<Icon name={'calendar'} color={colors.amber['600']} />}
            />
          </Flex>
        </Box>
      </Box>
      <Box padding={5}>
        <Heading size={'lg'} margin={1}>
          {t('Overview')}
        </Heading>
        <Text fontSize={'md'} margin={1} textAlign={'left'}>
          {overview}
        </Text>
      </Box>
      <MovieBackdropImage imagePath={backdrop} />
    </Box>
  );
}
