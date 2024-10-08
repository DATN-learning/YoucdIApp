import {View, Text} from 'react-native';
import React, {FC} from 'react';

interface Props {
  text: string;
}

const TextVarelaRoundRegular: FC<Props> = ({text}) => {
  return <Text
    style={{
        fontFamily: 'VarelaRound-Regular',
    }}
  >{text}</Text>;
};

export default TextVarelaRoundRegular;
