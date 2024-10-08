import {StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import stylesTM from '../../themes/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {HomeLearnScreenNavigationProps as HomeLearnNavigationProps} from '../../screens/LearnSpace/HomeScreen';
import {useAuth} from '../../configs/AuthProvider';
const HeaderHomeSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;
const IconContainer = styled.TouchableHighlight`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
`;
const HeaderHomeSectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  flex: 1;
  text-align: center;
`;
const HeaderHomeSection = () => {
  const {isAuthenticated} = useAuth();
  const navigation = useNavigation<HomeLearnNavigationProps>();
  const handleOpenMenu = () => {
    console.log('Open Menu');
  };
  
  const handleOpenNotification = () => {
    if (isAuthenticated) {
      console.log('Open Notification');
    } else {
      navigation.navigate('Authen');
    }
  };

  const label = 'Chúc Một Ngày Tốt Lành';

  return (
    <HeaderHomeSectionContainer>
      <IconContainer
        underlayColor={'#9e80f2'}
        onPress={handleOpenMenu}
        style={[styles.shadow]}>
        <AntDesign name="appstore-o" size={22} color="black" />
      </IconContainer>
      <HeaderHomeSectionTitle style={stylesTM.fontVR}>
        {label}
      </HeaderHomeSectionTitle>
      <IconContainer
        underlayColor={'#9e80f2'}
        onPress={handleOpenNotification}
        style={[styles.shadow]}>
        <Ionicons name="notifications-outline" size={22} color="black" />
      </IconContainer>
    </HeaderHomeSectionContainer>
  );
};

export default HeaderHomeSection;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
