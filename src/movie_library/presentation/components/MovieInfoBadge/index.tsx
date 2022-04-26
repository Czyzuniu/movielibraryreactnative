import {Box, Center, Text} from 'native-base';
import React, {ReactNode} from 'react';

type Props = {
  icon: ReactNode;
  mainText: string;
  secondaryText: string;
};

export default function MovieInfoBadge({icon, mainText, secondaryText}: Props) {
  return (
    <Center>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Text margin={1}>{mainText}</Text>
        {icon}
      </Box>
      <Text>{secondaryText}</Text>
    </Center>
  );
}
