import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ButtonProps} from './type';
import LinearGradient from 'react-native-linear-gradient';
import stylesTM from '../../themes/styles';
const ButtonContainer = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 10px;
`;

const Button: FC<ButtonProps> = props => {
  return (
    <ButtonContainer
      style={[props.style,stylesTM.shadow,{
        shadowColor: props.corlorLinear[2],
      }]}
      start={{x: 0, y: 0}}
      colors={props.corlorLinear}
      >
      <TouchableOpacity 
        onPress={()=>{
            props.changeMenuActive(props.nameMenu);
        }}
      >{props.children}</TouchableOpacity>
    </ButtonContainer>
  );
};

export default Button;
