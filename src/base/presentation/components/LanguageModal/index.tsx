import {Button, Center, Modal, useDisclose} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../../../../i18n/i18n';
import { styles } from './styles';
export default function LanguageModal() {
  const [language, setLanguage] = useState('en-GB');
  const {t} = useTranslation(['language', 'common']);
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name={'globe'} size={25} style={styles.headerIcon} onPress={onOpen} />
      ),
    });
  }, [navigation, onOpen]);

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);

  const onLanguageSave = () => {
    i18n.changeLanguage(language).then(() => {
      onClose();
    });
  };

  const supportedLanguages = [
    {
      label: t('en-GB'),
      value: 'en-GB',
    },
    {
      label: t('fr-FR'),
      value: 'fr-FR',
    },
    {
      label: t('pl'),
      value: 'pl',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} flex={1}>
      <Modal.Content maxWidth="600px">
        <Center>
          <Picker
            style={styles.languagePicker}
            selectedValue={language}
            onValueChange={value => setLanguage(value)}>
            {supportedLanguages.map(lang => {
              return (
                <Picker.Item
                  key={lang.value}
                  label={lang.label}
                  value={lang.value}
                />
              );
            })}
          </Picker>
        </Center>
        <Button
          margin={2}
          variant={'solid'}
          colorScheme="success"
          onPress={onLanguageSave}>
          {t('common:Save')}
        </Button>
      </Modal.Content>
    </Modal>
  );
}
