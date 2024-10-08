//import liraries
import React, {FC} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import ItemAnswer from './ItemAnswer';
import {IQuestionPayLoad} from '../../interfaces/Question';
// create a component
const ItemQuestionContainer = styled.View`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const QuestionContainer = styled.View`
  width: 100%;
`;
const LableQuestion = styled(TextMyfont)`
  color: #000;
`;
const ImageDescription = styled.Image`
  margin-top: 10px;
  width: 100%;
  height: 200px;
`;
const AnswerContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ItemQuestion: FC<IQuestionPayLoad> = props => {
  const [idAnswerChoose, setIdAnswerChoose] = React.useState<string>('-1');
  const [isChoose, setIsChoose] = React.useState<boolean>(false);

  const onPressAnswer = (id: string) => {
    setIdAnswerChoose(id);
    setIsChoose(true);
    if (id === props.answer_correct) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
    setTimeout(() => {
      setIsChoose(false);
      setIdAnswerChoose('-1');
    }, 2000);
  };

  return (
    <ItemQuestionContainer
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
      <QuestionContainer>
        <LableQuestion numberLine={50}>
          {props.number_question}.{props.title} {'('}
          {props.description} {')'}
        </LableQuestion>
      </QuestionContainer>
      {props.imageQuestions.length > 0 ? (
        <ImageDescription
          source={{
            uri: props.imageQuestions[0].toString(),
          }}
          resizeMode="contain"
        />
      ) : null}
      <AnswerContainer>
        <FlatList
          data={props.answers}
          renderItem={({item, index}) => (
            <ItemAnswer
              IAnswerPayLoad={item}
              index={index}
              indexquestion={props.number_question}
              isCorrect={item.id_answer === props.answer_correct}
              onPressAnswer={onPressAnswer}
              isChoose={isChoose}
              disabled={props.disable ? true : false}
            />
          )}
          keyExtractor={(item): any => item.id}
          numColumns={2}
        />
      </AnswerContainer>
    </ItemQuestionContainer>
  );
};

//make this component available to the app
export default ItemQuestion;
