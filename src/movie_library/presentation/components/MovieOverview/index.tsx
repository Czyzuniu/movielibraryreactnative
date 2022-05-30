import {Box, Heading, Text} from 'native-base';
import React from 'react';
import DescriptiveMovie from '../../../domain/entity/DescriptiveMovie';
import {useTranslation} from 'react-i18next';

type Props = {
  movie: DescriptiveMovie;
};

export default function MovieOverview({movie}: Props) {
  const {t} = useTranslation('viewMovie');
  const {overview} = movie;

  return (
    <Box margin={5} flex={1}>
      <Heading size={'lg'} margin={1}>
        {t('Overview')}
      </Heading>
      <Text fontSize={'md'} margin={1} textAlign={'left'}>
        {overview}
      </Text>
    </Box>
  );
}
