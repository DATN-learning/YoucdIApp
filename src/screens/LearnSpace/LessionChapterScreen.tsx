//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../routes/RootStack';
import {LearnNavigationParamList} from '../../routes/LearnNavigation';
import LessionChapterContainer from '../../containers/LessionChapterContainer';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import {useSelector} from 'react-redux';
import {chooseClassRoom} from '../../redux/classRoom/selectors';
const {width, height} = Dimensions.get('window');

// create a component
const LessionChapterScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

export type LessionChapterScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'LessionChapterScreen'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;

const LessionChapterScreen: FC = () => {
  const navigation = useNavigation<LessionChapterScreenNavigationProps>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'LessionChapterScreen'>>();
  const classRoom = useSelector(chooseClassRoom);
  const goBack = () => navigation.goBack();
  const label = `${classRoom} - Chương ${route.params.numberChapter} - ${route.params.nameLession}`;
  return (
    <LessionChapterScreenContainer>
      <HeaderScreenSection
        label={label}
        onPressGoBack={goBack}
      />
      <LessionChapterContainer />
    </LessionChapterScreenContainer>
  );
};

//make this component available to the app
export default LessionChapterScreen;
