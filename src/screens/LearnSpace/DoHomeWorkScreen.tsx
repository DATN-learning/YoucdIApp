//import liraries
import React, {FC, useCallback, useEffect} from 'react';

import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../../routes/RootStack';
import {LearnNavigationParamList} from '../../routes/LearnNavigation';
import styled from 'styled-components/native';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import DoHomeWorkContainer from '../../containers/DoHomeWorkContainer';
import {useSelector} from 'react-redux';
import {chooseClassRoom, chooseSubject} from '../../redux/classRoom/selectors';
// create a component

const DoHomeWorkScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

export type DoHomeWorkScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'DoHomeWorkScreen'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;

const DoHomeWorkScreen: FC = () => {
  const navigation = useNavigation<DoHomeWorkScreenNavigationProps>();
  const goBack = () => navigation.goBack();
  const classRoom = useSelector(chooseClassRoom);
  const subject = useSelector(chooseSubject);
  const label = `Bài Tập Môn ${subject.name} - Lớp ${classRoom}`;
  return (
    <DoHomeWorkScreenContainer>
      <HeaderScreenSection
        label={label}
        onPressGoBack={goBack}
      />
      <DoHomeWorkContainer />
    </DoHomeWorkScreenContainer>
  );
};

//make this component available to the app
export default DoHomeWorkScreen;
