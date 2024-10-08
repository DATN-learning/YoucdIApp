//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { QAndALearnScreenNavigationProps as QAndALearnNavigationProps } from '../../routes/NavigationProps';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import TextMyfont from '../../components/TextMyfont ';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsPostContainer from '../../containers/DetailsPostContainer';

// create a component
const DetailsPostScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const HeaderSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const BtnSavePost = styled.TouchableOpacity`
  flex-direction: row;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 4px;
  border-color: #9e80f2;
`;
const LabelBtnSavePost = styled(TextMyfont)`
  color: #9e80f2;
  margin-right: 10px;
`;
const BtnSharePost = styled.TouchableOpacity`
  margin-left: 10px;
`;

const DetailsPostScreen = () => {
  const navigation = useNavigation<QAndALearnNavigationProps>();
  const goBack = () => navigation.goBack();
  return (
    <DetailsPostScreenContainer>
      <HeaderScreenSection
        onPressGoBack={goBack}
        isViewHeader={true}
        viewComponent={
          <HeaderSection>
            <BtnSavePost>
              <LabelBtnSavePost>Lưu</LabelBtnSavePost>
              <FontAwesome name="bookmark-o" size={20} color={'#9e80f2'} />
            </BtnSavePost>
            <BtnSharePost>
              <Ionicons name="share-outline" size={35} color={'#9e80f2'} />
            </BtnSharePost>
          </HeaderSection>
        }
      />
      <DetailsPostContainer />
    </DetailsPostScreenContainer>
  );
};

//make this component available to the app
export default DetailsPostScreen;
