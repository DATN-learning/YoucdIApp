//import liraries
import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {getListQuestionChapter} from '../../redux/classRoom/selectors';
import {GIFJSON} from '../../utils/constant';
import {Text, View} from 'react-native';
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
  const listQuestionChapter = useSelector(getListQuestion);
  const [isStart, setIsStart] = React.useState(false);
  const countDown = useSelector(getCountDown);
  const stopCountDown = useSelector(getStopCountDown);
  const idQuestionSelected = useSelector(getIdQuestionSelected);
  const dispatch = useDispatch();
  let timeOut: any = null;
  const flatListRef = React.useRef<any>(null);
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
                <ItemQuestionGame data={item} index={index} />
              )}
              keyExtractor={(_, index): any => index.toString()}
            />
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
