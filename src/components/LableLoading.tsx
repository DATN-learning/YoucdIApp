//import liraries
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const LableLoading: FC<{
  text?: string;
}> = props => {
  const text = props.text;
  return (
    <Text
      style={{
        textAlign: 'center',
        color: '#ccc',
      }}>
      {text ? text : 'YOUCDI...'}
    </Text>
  );
};

//make this component available to the app
export default LableLoading;
