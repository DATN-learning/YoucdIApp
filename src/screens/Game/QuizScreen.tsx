//import liraries
import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {getListQuestionChapter} from '../../redux/classRoom/selectors';
import {GIFJSON} from '../../utils/constant';
import {Alert, Button, Text, View} from 'react-native';
import MenuGameSecton from '../../components/MenuGameSection';
import MenuGameSeciton from '../../components/MenuGameSection';
import ItemQuestionGame from '../../components/ItemQuestionGame';
import {useAuth} from '../../configs/AuthProvider';
import {
  getCountDown,
  getIdQuestionSelected,
  getListQuestion,
  getStopCountDown,
} from '../../redux/gameChapter/selectors';
import {
  setCountDown,
  setQuestionSelected,
  setStopCountDown,
} from '../../redux/gameChapter/actions';
import { submitChapterAnswer } from '../../api/scoreApi';
import { IQuestionPayLoad } from '../../interfaces/Question';
import { ItemQuestionGameProps } from '../../components/ItemQuestionGame/type';
import { useNavigation } from '@react-navigation/native';
import { ResultScreenNavigationProps } from './ResultScreen';
// create a component
const QuizScreenContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ViewGameContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #000;
`;
const ViewPlayGame = styled.View`
  flex: 1;
  justify-content: center;
  padding: 5px 10px;
`;
const ListQuestionGame = styled.FlatList``;

const QuizScreen = () => {
  const navigation = useNavigation<ResultScreenNavigationProps>();
  const listQuestionChapter = useSelector(getListQuestion);
  const [isStart, setIsStart] = React.useState(false);
  const countDown = useSelector(getCountDown);
  const stopCountDown = useSelector(getStopCountDown);
  const idQuestionSelected = useSelector(getIdQuestionSelected);
  const dispatch = useDispatch();
  let timeOut: any = null;
  const flatListRef = React.useRef<any>(null);
  const {user} = useAuth();
  const [userAnswers, setUserAnswers] = React.useState<any[]>([]); 
  const [score, setScore] = React.useState(0); 

  React.useEffect(() => {
    if (isStart) {
      if (countDown > 0) {
        if (!stopCountDown) {
          const timeOut = setTimeout(() => {
            dispatch(setCountDown(countDown - 1));
          }, 1000);
        }
      } else {
        let index = idQuestionSelected + 1;
        if (index >= listQuestionChapter.length) {
          index = 0;
          console.log('end game aa');
          clearTimeout(timeOut);
        } else {
          timeOut = setTimeout(() => {
            dispatch(setQuestionSelected(index));
            dispatch(setCountDown(10));
            flatListRef.current.scrollToIndex({
              index: index,
              animated: true,
            });
          }, 1000);
        }
      }
    }
  }, [countDown, isStart, stopCountDown]);

  const handleAnswerSelected = (answer: {question_id: string; answer_id: string; is_correct: boolean}) => {
    setUserAnswers(prev => [...prev, answer]);
    if (answer.is_correct) {
      setScore(prev => prev + 1); 
    }
  };

  const handleSubmitChapter = async () => {
    try {
      const currentQuestion = listQuestionChapter[idQuestionSelected];
      const id_question_query = currentQuestion?.id_question_query;

      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateScore = `${day}${month}${year}`;
      const score_id = `score_chapter_${dateScore}`;

      const response = await submitChapterAnswer(
        score_id,
        user.id,
        id_question_query,
        userAnswers
      );
      Alert.alert('Success', `Your total score is: ${response.data.data.total_score}`);
      navigation.navigate('ResultScreen', {
        score: score,
        userAnswers: userAnswers,
      }); // Điều hướng tới ResultScreen
    } catch (error) {
      Alert.alert('Error', 'Failed to submit chapter');
      console.error(error);
    }
  };

  const handleNextQuestion = () => {
    let nextIndex = idQuestionSelected + 1;
    if (nextIndex >= listQuestionChapter.length) {
      dispatch(setStopCountDown(true)); // Stop the countdown
      return; // Stay at the last question
    }
    dispatch(setQuestionSelected(nextIndex));
    dispatch(setCountDown(10));
    flatListRef.current.scrollToIndex({
      index: nextIndex,
      animated: true,
    });
  };

  return (
    <QuizScreenContainer>
      {isStart ? (
        <ViewGameContainer>
          <MenuGameSeciton />
          <ViewPlayGame>
            <ListQuestionGame
              data={listQuestionChapter}
              ref={flatListRef}
              horizontal={true}
              scrollEnabled={false}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}: any) => (
                <ItemQuestionGame data={item} index={index} onAnswerSelected={handleAnswerSelected} />
              )}
              keyExtractor={(_, index): any => index.toString()}
            />
            {idQuestionSelected < listQuestionChapter.length - 1 && (
              <Button title="Tiếp" onPress={handleNextQuestion} />
            )}
            {idQuestionSelected === listQuestionChapter.length - 1 && (
              <Button title="Hoàn Thành" onPress={handleSubmitChapter} />
            )}
            <Text>Total Score: {score}</Text>
          </ViewPlayGame>
        </ViewGameContainer>
      ) : (
        <LottieView
          source={GIFJSON.Countdown1}
          autoPlay
          speed={1}
          loop={false}
          style={{width: 150, height: 150}}
          onAnimationFinish={() => {
            setIsStart(true);
          }}
        />
      )}
    </QuizScreenContainer>
  );
};


//make this component available to the app
export default QuizScreen;




