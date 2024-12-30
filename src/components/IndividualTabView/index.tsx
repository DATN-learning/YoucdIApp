//import liraries
import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {useAuth} from '../../configs/AuthProvider';
import InfoAccSection from './InfoAccSection';
import TextMyfont from '../TextMyfont ';
import {AppColors} from '../../utils/constant';

// create a component
const IndividualTabViewContainer = styled.ScrollView`
  width: ${Dimensions.get('window').width}px;
  padding: 10px 10px;
  background-color: #fff;
`;

const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const ButtonLogout = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.8}px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: ${AppColors.purple};
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 100px;
`;
const LogoutText = styled(TextMyfont)`
  font-size: 20px;
  color: #ffffff;
`;

const IndividualTabView = () => {
  const {user, logout, isAuthenticated} = useAuth();
  return (
    <IndividualTabViewContainer>
      {isAuthenticated && (
        <>
          <InfoAccSection />
          <ButtonContainer>
            <ButtonLogout
              onPress={() => {
                logout(user.email);
              }}>
              <LogoutText>Đăng Xuất</LogoutText>
            </ButtonLogout>
          </ButtonContainer>
        </>
      )}
      {!isAuthenticated && (
        <Text style={{color: 'red', fontSize: 20}}>Chưa đăng nhập</Text>
      )}
      {/* {isAuthenticated && (
        <Text
          onPress={() => {
            logout(user.email);
          }}
          style={{color: 'red', fontSize: 20}}>
          Đăng Xuất
        </Text>
      )} */}
    </IndividualTabViewContainer>
  );
};

//make this component available to the app
export default IndividualTabView;
