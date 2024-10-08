import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import TextMyfont from '../TextMyfont ';
//?components
const FormRegisterSectionContainer = styled.View`
  width: 100%;
  height: 80%;
  margin-top: auto;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const Title = styled(TextMyfont)`
  font-size: 30px;
  color: ${AppColors.purple};
  align-self: center;
`;
const DescriptionText = styled(TextMyfont)`
  font-size: 16px;
  color: ${AppColors.purpleLight};
  align-self: center;
`;

const FormRegisterContainer = styled.View`
  width: 100%;
  margin-top: auto;
  padding: 20px;
`;
const InputContainer = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${(props: {validated: boolean}) =>
    props.validated ? AppColors.purple : '#ccc'};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  margin-top: 20px;
`;
const TextInput = styled.TextInput`
  flex: 1;
  color: ${AppColors.purple};
  margin-left: 10px;
`;

const InputEmail = styled(TextInput)``;
const InputPassword = styled(TextInput)``;
const ButtonLogin = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  background-color: ${(props: {validated: boolean}) =>
    props.validated ? AppColors.purple : AppColors.purpleLight};
  border-radius: 10px;
  padding: 10px;
  align-items: center;
`;
const ButtonLoginText = styled(TextMyfont)`
  font-size: 16px;
  color: #fff;
`;
//? type

import {FormRegisterSectionProps} from './types';
import {useAuth} from '../../configs/AuthProvider';
import {AppColors} from '../../utils/constant';

const FormRegisterSection: FunctionComponent<
  FormRegisterSectionProps
> = props => {
  const {
    email,
    validatedEmail,
    password,
    setPassword,
    validateEmail,
    onRegister,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    confirmPassword,
    setConfirmPassword,
  } = props;
  const {isLoadingRegister} = useAuth();

  const [hiddenPassword, setHiddenPassword] = React.useState<boolean>(true);

  return (
    <FormRegisterSectionContainer>
      <ScrollView style={{width: '100%'}}>
        <>
          <Title>Đăng Ký</Title>
          <DescriptionText>
            Đăng Ký tài khoản để trải nghiệm ngay
          </DescriptionText>
          <FormRegisterContainer>
            <InputContainer validated={firstName.length > 0}>
              <Fontisto name="person" size={20} color="#9e80f2" />
              <InputEmail
                placeholder="Họ và tên đệm..."
                value={firstName}
                onChangeText={text => setFirstName(text)}
                keyboardType="default"
                placeholderTextColor={'#bba7f1'}
              />
            </InputContainer>
            <InputContainer validated={lastName.length > 0}>
              <Fontisto name="person" size={20} color="#9e80f2" />
              <InputEmail
                placeholder="Tên..."
                value={lastName}
                onChangeText={text => setLastName(text)}
                keyboardType="default"
                placeholderTextColor={'#bba7f1'}
              />
            </InputContainer>
            <InputContainer validated={validateEmail && email.length > 0}>
              <Fontisto name="email" size={20} color="#9e80f2" />
              <InputEmail
                placeholder="Email"
                value={email}
                onChangeText={text => validatedEmail(text)}
                keyboardType="email-address"
                placeholderTextColor={'#bba7f1'}
              />
            </InputContainer>
            <InputContainer validated={password.length > 6}>
              <Feather name="lock" size={20} color="#9e80f2" />
              <InputPassword
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={hiddenPassword}
                placeholderTextColor={'#bba7f1'}
              />
              <Ionicons
                name={hiddenPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#9e80f2"
                onPress={() => setHiddenPassword(!hiddenPassword)}
              />
            </InputContainer>
            <InputContainer
              validated={
                password == confirmPassword && confirmPassword.length > 6
              }>
              <Feather name="lock" size={20} color="#9e80f2" />
              <InputPassword
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={hiddenPassword}
                placeholderTextColor={'#bba7f1'}
              />
              <Ionicons
                name={hiddenPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#9e80f2"
                onPress={() => setHiddenPassword(!hiddenPassword)}
              />
            </InputContainer>
            <ButtonLogin
              onPress={
                validateEmail &&
                password.length > 6 &&
                password == confirmPassword &&
                firstName.length > 0 &&
                lastName.length > 0
                  ? onRegister
                  : () => {
                      Alert.alert(
                        'Thông Tin Đăng Nhập',
                        'Vui Lòng Nhập Thông Tin Đăng Nhập',
                        [
                          {
                            text: 'Đồng ý',
                            onPress: () => {},
                          },
                        ],
                        {cancelable: false},
                      );
                    }
              }
              validated={
                validateEmail &&
                password.length > 6 &&
                password == confirmPassword &&
                firstName.length > 0 &&
                lastName.length > 0
              }>
              {isLoadingRegister ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <ButtonLoginText>Đăng Ký</ButtonLoginText>
              )}
            </ButtonLogin>
          </FormRegisterContainer>
        </>
      </ScrollView>
    </FormRegisterSectionContainer>
  );
};

export default FormRegisterSection;
