import {IconProps} from "react-native-vector-icons/Icon";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = IconProps

export default function BottomNavigationIcon(props: Props) {
  return <Icon size={15} {...props}  />
}
