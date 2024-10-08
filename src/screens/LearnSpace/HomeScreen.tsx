import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import stylesTM from '../../themes/styles';
import {useAuth} from '../../configs/AuthProvider';
import HeaderHomeSection from '../../components/HeaderHomeSection';
import MenuHeaderHomeSection from '../../components/MenuHeaderHomeSection';
import {CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {RootStackParamList} from '../../routes/RootStack';

import {LearnNavigationParamList} from '../../routes/LearnNavigation';
import ClassSection from '../../components/ClassSection';
import PDFViewer from '../../components/PDFViewer';
import AuthHomeSection from '../../components/AuthHomeSection';
import {useDispatch} from 'react-redux';
import {getSubjectClassRoomRequest} from '../../redux/classRoom/actions';

const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: ##f4f0f0;
`;
const ScrollView = styled.ScrollView`
  flex: 1;
`;
export type HomeLearnScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'LearnNavigation'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;

const HomeScreen = () => {
  const {isAuthenticated} = useAuth();
  const dispath = useDispatch();

  const onLoadSubject = React.useCallback(() => {
    dispath(getSubjectClassRoomRequest());
  }, [dispath]);
  
  React.useEffect(() => {
    onLoadSubject();
  }, [dispath]);

  return (
    <HomeScreenContainer>
      <HeaderHomeSection />
      <ScrollView>
        <MenuHeaderHomeSection />
        {isAuthenticated ? null : <AuthHomeSection />}
        <ClassSection />
      </ScrollView>
    </HomeScreenContainer>
  );
};

export default HomeScreen;
