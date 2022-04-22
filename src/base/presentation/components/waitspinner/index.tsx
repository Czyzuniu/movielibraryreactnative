import React from 'react';
import {Center, Spinner} from 'native-base';
import {styles} from './styles';

type Props = {
  isVisible: boolean;
};

export default function WaitSpinner({isVisible = false}: Props) {
  return isVisible ? (
    <Center style={styles.loading}>
      <Spinner color="green.500" size={'lg'} />
    </Center>
  ) : null;
}
