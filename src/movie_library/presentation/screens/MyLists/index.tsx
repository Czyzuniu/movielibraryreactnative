import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Box, Button, Text} from "native-base";
import {CreatedListsStackStackParamList} from "../../../../navigation/types";
import {useTranslation} from "react-i18next";

type Props = StackScreenProps<CreatedListsStackStackParamList, 'MyLists'>;

export default function MyLists({navigation}: Props) {
  const { t } = useTranslation('lists')

  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
      justifyContent={'space-between'}
    >
      <Box flex={1}>
      </Box>
      <Box flex={0.2} >
        <Button colorScheme={'success'} m={5} onPress={() => navigation.navigate('CreateList')}>
          <Text>{t('CreateANewList')}</Text>
        </Button>
      </Box>
    </Box>
  )
}
