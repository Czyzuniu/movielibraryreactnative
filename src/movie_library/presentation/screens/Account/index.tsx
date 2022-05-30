import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import {Box, Center, Heading} from "native-base";

type Props = StackScreenProps<HomeStackParamList, 'ViewMovieHomePageWebView'>;

export default function Account({route}: Props) {
  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <Center flex={1}>
        <Heading>My Account</Heading>
      </Center>
    </Box>
  )
}
