import {Box, Center, Text} from 'native-base';
import React, {ReactNode} from 'react';

type Props = {
  icon: ReactNode;
  mainText: string;
  secondaryText: string;
};

export default function MovieInfoBadge({icon, mainText, secondaryText}: Props) {
  return (
    <Center flex={1}>
      <Box flexDirection={'row'} alignItems={'center'} flex={1}>
        <Text margin={1}>{mainText}</Text>
        {icon}
      </Box>
      <Text>{secondaryText}</Text>
    </Center>
  );
}
