//import liraries
import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {GIFJSON} from '../../utils/constant';
import TextMyfont from '../../components/TextMyfont ';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootStack';
import {QuizzStackParamList} from '../../routes/Quiz';
import {useDispatch, useSelector} from 'react-redux';
import {getListQuestionChapter} from '../../redux/classRoom/selectors';
import {setListQuestion} from '../../redux/gameChapter/actions';
// create a component
const SplashScreenContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;
const TextLoading = styled(TextMyfont)`
  font-size: 20px;
  color: #fff;
`;

export type SplashScreenNavigationProps = NativeStackNavigationProp<
  QuizzStackParamList,
  'SplashScreen'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProps>();
  const listQuestionChapter = useSelector(getListQuestionChapter);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('PrepareScreen');
    }, 2000);
  }, []);
  React.useEffect(() => {
    dispatch(setListQuestion(listQuestionChapter));
  }, [listQuestionChapter]);

  return (
    <SplashScreenContainer>
      <StatusBar hidden />
      <LottieView
        source={GIFJSON.Loading2}
        autoPlay
        loop
        speed={1}
        style={{width: 200, height: 200}}
      />
      <TextLoading>Đang tải dữ liệu...</TextLoading>
    </SplashScreenContainer>
  );
};

//make this component available to the app
export default SplashScreen;
