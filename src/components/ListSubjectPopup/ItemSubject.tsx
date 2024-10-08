//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {ISubjectProps} from './type';
import TextMyfont from '../TextMyfont ';
const {width, height} = Dimensions.get('window');
// create  component

export const ItemSubjectContainer = styled.View`
  width: ${width / 2}px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
export const ItemContent = styled.TouchableOpacity`
  width: 80%;
  background-color: #9e80f2;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px #000;
`;
export const SubjectTitle = styled(TextMyfont)`
  color: #fff;
`;
const ItemSubject: FC<ISubjectProps> = props => {
  const handleChooseSubject = () =>
    props.onPress(
      props.subject.id_subject,
      props.subject.id,
      props.subject.name_subject,
    );
  return (
    <ItemSubjectContainer>
      <ItemContent onPress={handleChooseSubject}>
        <SubjectTitle>{props.subject.name_subject}</SubjectTitle>
      </ItemContent>
    </ItemSubjectContainer>
  );
};

//make this component available to the app
export default ItemSubject;
