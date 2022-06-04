import {Button, Center} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

type Props = {
  isFetching: boolean,
  onPress: () => void
}

export default function LoadMoreButton({ isFetching, onPress } : Props) {
  return (
    <Center flex={0.2} m={5}>
      <Button
        variant={'solid'}
        isLoading={isFetching}
        spinnerPlacement="end"
        onPress={onPress}
        leftIcon={<Icon name={'chevron-circle-down'} color={'white'}/>} w={250}>Load more...
      </Button>
    </Center>
  )
}
