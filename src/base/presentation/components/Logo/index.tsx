import {Image} from "native-base";
import React from "react";

export default function Logo() {
  return <Image source={require('../../../../../assets/logo.jpg')} width={75} height={75} alt={'Logo of the movie DB'} />
}
