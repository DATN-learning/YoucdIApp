import React from 'react';
import {Text,StyleSheet} from 'react-native';

const TextMyfont = ({
  children,
  style,
  numberLine
}: {
  children: string[] | string | any;
  style?: any;
  numberLine?: number;
}) => {
  return (
    <Text
      numberOfLines={numberLine ? numberLine : 1}
      style={[{
        fontFamily: 'VarelaRound-Regular',
        }, style]}>
      {children}
    </Text>
  );
};

export default TextMyfont;
