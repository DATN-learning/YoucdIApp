import React, {FC} from 'react';
import {Alert, Button, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import AnswerQuestionGame from './AnswerQuestionGame';
import {ItemQuestionGameProps} from './type';
import {useAuth} from '../../configs/AuthProvider';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCountDown,
  getIdQuestionSelected,
} from '../../redux/gameChapter/selectors';
import {
  addQuestionAnswered,
  setCountDown,
  setQuestionSelected,
} from '../../redux/gameChapter/actions';
import {submitChapterAnswer} from '../../api/scoreApi'; // Import the API call

const ItemQuestionGameContainer = styled.View`
  flex: 1;
  width: ${(props: {isLandscape: boolean}) =>
    props.isLandscape
      ? Dimensions.get('window').width - 30
      : Dimensions.get('window').height - 30}px;
  background-color: rgb(56, 21, 53);
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
`;
const QuestionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const QuestionText = styled(TextMyfont)`
  color: #fff;
  font-size: 20px;
  align-self: center;
`;
const AnswerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const colorsAnswer = [
  'rgb(38,87,139)',
  'rgb(35,125,133)',
  'rgb(173,118,16)',
  'rgb(141,36,57)',
];
function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const shuffledColors = shuffleArray([...colorsAnswer]);

const ItemQuestionGame: FC<ItemQuestionGameProps> = props => {
  const {data, index, onAnswerSelected} = props; 
  const [isChoose, setIsChoose] = React.useState(false);
  const [answerChoosed, setAnswerChoosed] = React.useState('');
  const {orientation, user} = useAuth();

  const answerChoose = (id: string) => {
    const isCorrect = id === data.answer_correct;
    setAnswerChoosed(id);
    setIsChoose(true);
    console.log(id)

    onAnswerSelected({
      question_id: String(data.id),
      answer_id: id,
      is_correct: isCorrect,
    });
  };

  return (
    <ItemQuestionGameContainer isLandscape={orientation === 'landscape'}>
      <QuestionContainer>
        <ScrollView>
          <QuestionText>{data.title}</QuestionText>
        </ScrollView>
      </QuestionContainer>
      <AnswerContainer>
        {data.answers.map((item, index) => (
          <AnswerQuestionGame
            key={index}
            color={shuffledColors[index]}
            item={item}
            onClick={() => answerChoose(item.id_answer)}
            isAnswerCorrect={ isChoose ? item.id_answer === data.answer_correct : false }
            isChoose={isChoose}
          />
        ))}
      </AnswerContainer>
    </ItemQuestionGameContainer>
  );
};

//make this component available to the app
export default ItemQuestionGame;
