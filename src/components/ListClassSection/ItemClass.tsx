//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {IClassProps} from './type';
import TextMyfont from '../TextMyfont ';
const {width, height} = Dimensions.get('window');
// create  component

const ItemClassContainer = styled.View`
  width: ${width / 2}px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
const ItemContent = styled.TouchableOpacity`
  width: 80%;
  background-color: #9e80f2;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px #000;
`;
const ClassTitle = styled(TextMyfont)`
    color: #fff;
`;
const ItemClass: FC<IClassProps> = props => {
  const handleChooseClass = () => props.onPress(props.class.number);
  return (
    <ItemClassContainer>
      <ItemContent onPress={handleChooseClass}>
        <ClassTitle>{props.class.name}</ClassTitle>
      </ItemContent>
    </ItemClassContainer>
  );
};

//make this component available to the app
export default ItemClass;
