import React from 'react';
import {Center, Spinner, useTheme} from 'native-base';
import {styles} from './styles';

type Props = {
  isVisible?: boolean;
};

export default function WaitSpinner({isVisible = false}: Props) {
  const {
    colors
  } = useTheme();

  return isVisible ? (
    <Center testID={'WAIT_SPINNER'} style={[styles.loading, { backgroundColor: colors.muted['800']}]}>
      <Spinner color="green.500" size={'lg'} />
    </Center>
  ) : null;
}
