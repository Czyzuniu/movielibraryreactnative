import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LoggedInStackParamList} from '../../../../navigation/types';
import {Box, Center, Heading} from "native-base";

type Props = StackScreenProps<LoggedInStackParamList, 'ViewMovieHomePageWebView'>;

export default function Watchlist({route}: Props) {
  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <Center flex={1}>
        <Heading>My Watchlist</Heading>
      </Center>
    </Box>
  )
}
