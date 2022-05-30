import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../../../navigation/types';
import {Box, Center, Heading} from "native-base";
import {useAppSelector} from "../../../../redux/hooks/hooks";

type Props = StackScreenProps<HomeStackParamList, 'ViewMovieHomePageWebView'>;

export default function Account({route}: Props) {
  const username = useAppSelector(state => state.session.user.username)

  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <Center flex={1}>
        <Heading>My Account</Heading>
        <Heading size={'xs'}>{username}</Heading>
      </Center>
    </Box>
  )
}
