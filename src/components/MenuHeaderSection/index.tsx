//import liraries
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PrepareScreenNavigationProps as PrepareNavigationProps} from '../../screens/Game/PrepareScreen';
import {useNavigation} from '@react-navigation/native';
import {IMenuHeaderSection} from './type';
// create a component
const MenuHeaderSectionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;
const BtnContainer = styled.TouchableOpacity``;

const MenuHeaderSection: FC<IMenuHeaderSection> = props => {
  const navigation = useNavigation<PrepareNavigationProps>();
  const goBack = () => navigation.navigate('ListQuestionScreen', {});
  return (
    <MenuHeaderSectionContainer>
      <BtnContainer onPress={goBack}>
        <FontAwesome name="close" size={30} color="#fff" />
      </BtnContainer>
    </MenuHeaderSectionContainer>
  );
};

//make this component available to the app
export default MenuHeaderSection;
