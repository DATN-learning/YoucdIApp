//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {useAuth} from '../../configs/AuthProvider';
const {width, height} = Dimensions.get('window');
import {IAnswerPayLoad} from '../../interfaces/Answer';
const WIDTH = (width - 82) / 2;

// create a component
const ItemAnswerContainer = styled.TouchableOpacity`
  width: ${(props: {
    isPortrait: boolean;
    isCorrect: boolean;
    isChoose: boolean;
  }) => (props.isPortrait ? (width - 82) / 2 : (height - 82) / 2)}px;
  padding: 10px;
  margin-bottom: 2px;
  border-radius: 10px;
  background-color: ${(props: {
    isPortrait: boolean;
    isCorrect: boolean;
    isChoose: boolean;
  }) => (props.isChoose ? (props.isCorrect ? '#B5F1CC' : '#FD8A8A') : '#fff')};
`;
const Answer = styled(TextMyfont)`
  font-size: 16px;
  color: ${(props: {isChoose: boolean; numberLine: number}) =>
    props.isChoose ? '#fff' : '#000'};
`;
const ImageAnswer = styled.Image`
  width: 100%;
  height: 100px;
`;

const ItemAnswer: FC<{
  IAnswerPayLoad: IAnswerPayLoad;
  index: number;
  indexquestion: number;
  isCorrect: boolean;
  onPressAnswer: (id: string) => void;
  isChoose: boolean;
  disabled: boolean;
}> = props => {
  const {orientation} = useAuth();
  return (
    <>
      <ItemAnswerContainer
        isPortrait={orientation === 'portrait' ? true : false}
        isCorrect={props.isCorrect}
        isChoose={props.isChoose}
        disabled={props.disabled ? true : props.isChoose}
        onPress={() => props.onPressAnswer(props.IAnswerPayLoad.id_answer)}
        style={{
          shadowColor: '#9e80f2 ',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Answer isChoose={props.isChoose} numberLine={10}>
          {props.indexquestion}
          {'.'}
          {props.index + 1} {')'} {props.IAnswerPayLoad.answer_text}
        </Answer>
        {props.IAnswerPayLoad.imageAnswers.length > 0 ? (
          <ImageAnswer
            source={{
              uri: props.IAnswerPayLoad.imageAnswers[0]?.toString(),
            }}
            resizeMode="contain"
          />
        ) : null}
      </ItemAnswerContainer>
    </>
  );
};

//make this component available to the app
export default ItemAnswer;
