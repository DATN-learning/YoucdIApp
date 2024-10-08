//import liraries
import React, {FC} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {AnswerQuestionGameProps} from './type';
import TextMyfont from '../TextMyfont ';
// create a component
const AnswerQuestionGameContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props: {color: string}) => props.color};
  height: 100%;
  border-radius: 10px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const TextAnswer = styled(TextMyfont)`
  color: #fff;
  align-self: center;
  font-size: 16px;
`;

const AnswerQuestionGame: FC<AnswerQuestionGameProps> = props => {
  const {item, isAnswerCorrect, isChoose, color, onClick} = props;
  const chooseAnswer = () => onClick(item.id_answer);
  return (
    <>
      <AnswerQuestionGameContainer
        onPress={chooseAnswer}
        disabled={isChoose}
        color={
          isChoose
            ? isAnswerCorrect
              ? 'rgb(52,132,81)'
              : 'rgb(139,35,52)'
            : color
        }>
        <TextAnswer numberLine={60}>{item.answer_text}</TextAnswer>
      </AnswerQuestionGameContainer>
    </>
  );
};

//make this component available to the app
export default AnswerQuestionGame;
