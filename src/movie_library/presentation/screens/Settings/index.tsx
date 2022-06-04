import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Box, Button, Center, Heading, useDisclose} from "native-base";
import {useAppDispatch, useAppSelector} from "../../../../redux/hooks/hooks";
import {Picker} from "@react-native-picker/picker";
import AsyncStorageUtils from "../../../../utils/AsyncStorageUtils";
import {signOut} from "../../../../redux/slice/session";
import {moviesApi} from "../../../../redux/services/movies";
import {useTranslation} from "react-i18next";
import {SettingsStackTypeParamList} from "../../../../navigation/types";

type Props = StackScreenProps<SettingsStackTypeParamList, 'Settings'>;

export default function Settings({route}: Props) {
  const username = useAppSelector(state => state.session.user.username)
  const {t, i18n} = useTranslation(['settings']);
  const [language, setLanguage] = useState(i18n.language);
  const {onClose} = useDisclose();
  const dispatch = useAppDispatch();

  const onLanguageSave = () => {
    i18n.changeLanguage(language).then(() => {
      dispatch(moviesApi.util.invalidateTags(['PopularMovies']))
      onClose();
    });
  };

  return (
    <Box
      _dark={{
        backgroundColor: 'muted.800',
      }}
      flex={1}
    >
      <Box flex={1} m={15}>
        <Heading>{t('MyAccount')}</Heading>
        <Heading size={'xs'}>{username}</Heading>
        <Center m={5}>
          <Heading size={'xs'}>{t('Language')}</Heading>
          <Picker
            style={{
              width: '100%',
            }}
            selectedValue={language}
            onValueChange={value => setLanguage(value)}>
            {Object.keys(i18n.services.resourceStore.data).map(lang => {
              return (
                <Picker.Item
                  key={lang}
                  label={t(`Languages.${lang}`)}
                  value={lang}
                />
              );
            })}
          </Picker>
        </Center>
      </Box>
      <Button
        margin={2}
        variant={'solid'}
        colorScheme="success"
        onPress={onLanguageSave}>
        {t('common:Save')}
      </Button>
      <Button
        margin={2}
        variant={'solid'}
        colorScheme="danger"
        onPress={() => {
          AsyncStorageUtils.removeEntry('session_id').then(() => {
            dispatch(signOut())
          })
        }}>
        {t('SignOut')}
      </Button>
    </Box>
  )
}
