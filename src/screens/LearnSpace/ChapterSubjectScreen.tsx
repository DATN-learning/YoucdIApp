//import liraries
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/RootStack';
import ListChapterSubjectSection from '../../components/ListChapterSubjectSection/ListChapterSubjectSection';
import { useSelector } from 'react-redux';
import { chooseClassRoom, chooseSubject } from '../../redux/classRoom/selectors';
// create a component

const ChapterSubjectContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

export type ChapterSubjectScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ChapterSubjectScreen'
>;

const ChapterSubjectScreen: FC = () => {
  const navigation = useNavigation<ChapterSubjectScreenNavigationProps>();
  const goBack = () => navigation.goBack();
  const classRoom = useSelector(chooseClassRoom);
  const subject = useSelector(chooseSubject);
  const label = `Lý Thuyết Môn ${subject.name} - Lớp ${classRoom}`;
  return (
    <ChapterSubjectContainer>
      <HeaderScreenSection
        label={label}
        onPressGoBack={goBack}
      />
      <ListChapterSubjectSection
        subject_id={subject.id}
      />
    </ChapterSubjectContainer>
  );
};

export default ChapterSubjectScreen;
