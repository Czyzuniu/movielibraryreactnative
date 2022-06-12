import {Box, HStack, IImageProps, useTheme} from 'native-base';
import React from 'react';
import MovieInfoBadge from '../MovieInfoBadge';
import CoreMapper from '../../../../base/mapper/CoreMapper';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import {useTranslation} from 'react-i18next';

type Props = IImageProps & {
  movie: DescriptiveMovie;
};

export default function MovieBadgesRow({movie}: Props) {
  const {colors} = useTheme();
  const {t} = useTranslation('viewMovie');

  return (
    <Box m={1.5}>
    <HStack margin={1.5} space={5} flexDirection={'row'}>
      <MovieInfoBadge
        mainText={CoreMapper.numberToString(movie.averageVote)}
        secondaryText={t('TotalVotes', {
          total: CoreMapper.numberToString(movie.totalVotes),
        })}
        icon={<Icon name={'star'} color={colors.amber['600']}/>}
      />
      <MovieInfoBadge
        mainText={t('RuntimeMin', {minutes: movie.runTime})}
        secondaryText={t('Runtime')}
        icon={<Icon name={'clock-o'} color={colors.amber['600']}/>}
      />
      <MovieInfoBadge
        mainText={dayjs(movie.releaseDate).format('MMM, D YYYY')}
        secondaryText={t('ReleaseDate')}
        icon={<Icon name={'calendar'} color={colors.amber['600']}/>}
      />
    </HStack>
    </Box>
  );
}
