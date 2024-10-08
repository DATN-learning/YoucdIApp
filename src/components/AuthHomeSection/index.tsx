//import liraries
import React, {Component} from 'react';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {HomeLearnScreenNavigationProps as HomeLearnNavigationProps} from '../../screens/LearnSpace/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import { AppColors } from '../../utils/constant';
const AuthHomeSectionContainer = styled.View`
  background-color: #fff;
  padding: 10px 20px;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${AppColors.purple};
  margin: 10px;
`;
const Label = styled(TextMyfont)`
  font-size: 16px;
  color: #000;
`;
const MenuContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0px;
`;

const MenuItemContainer = styled.View`
  width: 50%;
  padding: 10px;
  height: 70px;
`;

const MenuItem = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
`;
const ItemRegister = styled(MenuItem)`
  background-color: ${AppColors.purple};
  border: 1px solid ${AppColors.purple};
`;
const ItemLogin = styled(MenuItem)`
  background-color: #fff;
  border: 1px solid ${AppColors.purple};
`;
const LabelMenuItemLogin = styled(TextMyfont)`
  color: ${AppColors.purple};
`;
const LabelMenuItemRegister = styled(TextMyfont)`
  color: #fff;
`;

// create a component
const AuthHomeSection = () => {
  const navigation = useNavigation<HomeLearnNavigationProps>();

  const handleLogin = () => navigation.navigate('Authen');
  const handleRegister = () => navigation.navigate('Authen');

  return (
    <>
      <AuthHomeSectionContainer>
        <Label>Bạn hãy đăng nhập hoặc đăng ký he</Label>
        <MenuContainer>
          <MenuItemContainer>
            <ItemLogin onPress={handleLogin}>
              <LabelMenuItemLogin>Đăng nhập</LabelMenuItemLogin>
            </ItemLogin>
          </MenuItemContainer>
          <MenuItemContainer>
            <ItemRegister onPress={handleRegister}>
              <LabelMenuItemRegister>Đăng Ký</LabelMenuItemRegister>
            </ItemRegister>
          </MenuItemContainer>
        </MenuContainer>
      </AuthHomeSectionContainer>
    </>
  );
};

//make this component available to the app
export default AuthHomeSection;
