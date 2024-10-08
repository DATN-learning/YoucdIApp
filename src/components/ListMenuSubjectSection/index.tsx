//import liraries
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {IIListMenuSubjectSectionProps} from './type';
import MenuItem from './MenuItem';
import {useNavigation} from '@react-navigation/native';
import {HomeLearnScreenNavigationProps as HomeLearnNavigationProps} from '../../screens/LearnSpace/HomeScreen';
// create a component

const ListMenuSubjectSectionContainer = styled.View`
  width: 100%;
  padding: 0px 0px 20px 0px;
  align-items: center;
`;

const ListMenuSubjectSection: FC<IIListMenuSubjectSectionProps> = props => {
  const navigation = useNavigation<HomeLearnNavigationProps>();
  const handlePressLearnTheory = async () => {
    props.setIsShowPopupSubject(false);
    setTimeout(() => {
      navigation.navigate('ChapterSubjectScreen');
    }, 10);
  };

  const handlePressDoExercise = async () => {
    props.setIsShowPopupSubject(false);
    setTimeout(() => {
      navigation.navigate('DoHomeWorkScreen', {});
    }, 10);
  };

  return (
    <ListMenuSubjectSectionContainer>
      <MenuItem
        title="Học lý thuyết"
        bgColor="#ea83f3"
        onPress={handlePressLearnTheory}
      />
      <MenuItem
        title="Làm bài tập"
        bgColor="#69ece6"
        onPress={handlePressDoExercise}
      />
    </ListMenuSubjectSectionContainer>
  );
};

//make this component available to the app
export default ListMenuSubjectSection;
