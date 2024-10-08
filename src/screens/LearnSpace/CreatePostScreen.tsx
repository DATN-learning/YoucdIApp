//import liraries
import React, {FC} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import {CreatePostScreenNavigationProps} from '../../routes/NavigationProps';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import CreatePostContainer from '../../containers/CreatePostContainer';
// create a component
const CreatePostScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const CreatePostScreen: FC = () => {
  const navigation = useNavigation<CreatePostScreenNavigationProps>();
  const goBack = () => navigation.goBack();
  const label = 'Tạo bài viết';
  return (
    <CreatePostScreenContainer>
      <HeaderScreenSection label={label}  onPressGoBack={goBack} />
      <CreatePostContainer />
    </CreatePostScreenContainer>
  );
};

//make this component available to the app
export default CreatePostScreen;
