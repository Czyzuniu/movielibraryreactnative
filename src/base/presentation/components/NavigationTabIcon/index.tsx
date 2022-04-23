import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import {useTheme} from 'native-base';

type Props = Pick<IconProps, 'name'> & {
  color: string;
};

export default function NavigationTabIcon({color, name}: Props) {
  return <Icon name={name} color={color} size={15} />;
}
