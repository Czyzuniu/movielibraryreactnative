import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Box, Button, FormControl, Input, Stack, Text} from "native-base";
import {CreatedListsStackStackParamList} from "../../../../navigation/types";
import {useTranslation} from "react-i18next";
import {useCreateListMutation} from "../../../../redux/services/list";
import {Controller, UnpackNestedValue, useForm} from "react-hook-form";

type Props = StackScreenProps<CreatedListsStackStackParamList, 'MyLists'>;

type FormData = {
  listName: string;
};

export default function CreateList({navigation}: Props) {
  const {handleSubmit, watch, formState: {isValid, errors}, control} = useForm<FormData>({mode: 'onChange'});
  const {t} = useTranslation('lists')
  const [createList, {isLoading, error}] = useCreateListMutation();

  const submitForm = async (data: UnpackNestedValue<FormData>) => {
    try {
      await createList({name: data.listName, description: 'test', language: 'en'}).unwrap()
      navigation.pop()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
      justifyContent={'space-between'}
    >
      <Box flex={1}>
        <Stack mx="4">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <FormControl isInvalid isRequired>
                  <FormControl.Label>{t('ListName')}</FormControl.Label>
                  <Input
                    type="text"
                    value={value}
                    onBlur={onBlur}
                    placeholder={t('ListNamePlaceholder')}
                    onChangeText={onChange}
                  />
                  {errors.listName &&
                      <FormControl.ErrorMessage>
                        {t('RequiredField')}
                      </FormControl.ErrorMessage>
                  }
                </FormControl>
              )
            }}
            name={'listName'}
          />
        </Stack>
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          spinnerPlacement={'end'}
          colorScheme={'success'}
          m={5}
          onPress={handleSubmit(submitForm)}>
          <Text>{t('CreateYourList')}</Text>
        </Button>
      </Box>
    </Box>
  )
}
