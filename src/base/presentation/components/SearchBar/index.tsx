import React, {useState} from 'react';
import {Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';

type Props = {
  onSearch: (text: string) => void;
};

export default function SearchBar({onSearch}: Props) {
  const [isFocused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const {t} = useTranslation('common');

  return (
    <Input
      placeholder={t('Search')}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        onSearch(value);
      }}
      w="75%"
      size={'md'}
      mx={5}
      value={value}
      onChangeText={setValue}
      variant={'filled'}
      InputRightElement={
        isFocused ? (
          <Icon
            style={styles.clearIcon}
            size={25}
            name={'times-circle'}
            onPress={() => {
              setValue('');
              setFocused(false);
              Keyboard.dismiss();
            }}
          />
        ) : undefined
      }
    />
  );
}
