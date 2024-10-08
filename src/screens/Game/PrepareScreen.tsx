//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {GIFJSON} from '../../utils/constant';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/RootStack';
import {QuizzStackParamList} from '../../routes/Quiz';
import MenuHeaderSection from '../../components/MenuHeaderSection';
import TextMyfont from '../../components/TextMyfont ';
import {useDispatch, useSelector} from 'react-redux';
import {
  chooseClassRoom,
  chooseSubject,
  getChapterEnable,
} from '../../redux/classRoom/selectors';
import {
  setCountDown,
  setQuestionSelected,
} from '../../redux/gameChapter/actions';

// create a component

const PrepareScreenContainer = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px 0px;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
`;
const Title = styled(TextMyfont)`
  font-size: 20px;
  color: #fff;
`;
const Lable = styled(TextMyfont)`
  font-size: 20px;
  color: #fff;
  text-align: center;
`;
export type PrepareScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<QuizzStackParamList, 'PrepareScreen'>,
  NativeStackNavigationProp<RootStackParamList, 'ListQuestionScreen'>
>;

const PrepareScreenScreen = () => {
  const navigation = useNavigation<PrepareScreenNavigationProps>();
  const subject = useSelector(chooseSubject);
  const classRoom = useSelector(chooseClassRoom);
  const chapter = useSelector(getChapterEnable);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setCountDown(10));
    dispatch(setQuestionSelected(0));
  }, []);
  const handlePlay = () => {
    navigation.navigate('QuizScreen', {});
  };
  return (
    <PrepareScreenContainer>
      <StatusBar hidden />
      <MenuHeaderSection />
      <Container>
        <Title>
          {chapter.name} {subject.name} {classRoom}
        </Title>
        <Title>Bạn đã sẵn sàng chưa?</Title>
        <Lable numberLine={6}>
          Bạn sẽ được hỏi các câu hỏi về các chủ đề trong khoá học.{'\n'} Mỗi
          câu hỏi sẽ có 4 đáp án. Bạn hãy chọn đáp án đúng nhất. Bạn sẽ có 30
          giây để trả lời mỗi câu hỏi. Bạn sẽ được xem lại kết quả sau khi hoàn
          thành
        </Lable>
        <TouchableOpacity onPress={handlePlay}>
          <LottieView
            source={GIFJSON.Start}
            autoPlay
            loop
            speed={1}
            style={{width: 100, height: 100}}
          />
        </TouchableOpacity>
      </Container>
    </PrepareScreenContainer>
  );
};

//make this component available to the app
export default PrepareScreenScreen;
