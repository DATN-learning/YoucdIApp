//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {IItemMenuSubjectProps} from './type';
const {width, height} = Dimensions.get('window');
// create a component
const MenuItemContainer = styled.TouchableOpacity`
  width: ${width * 0.8}px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`;
const Title = styled(TextMyfont)``;
const MenuItem: FC<IItemMenuSubjectProps> = props => {
    const {title,bgColor,onPress} = props;
  return (
    <MenuItemContainer
        style={{
            backgroundColor: bgColor,
        }}
        onPress={onPress}
    >
      <Title>{title}</Title>
    </MenuItemContainer>
  );
};

//make this component available to the app
export default MenuItem;
