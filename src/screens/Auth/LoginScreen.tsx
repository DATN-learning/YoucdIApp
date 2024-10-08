import {View, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {IMAGE_BG_LOGIN} from '../../utils/constant';
import FormLoginSection from '../../components/FormLogin/FormLoginSection';
import {useAuth} from '../../configs/AuthProvider';
import { AuthStackScreenNavigationProps } from '../../routes/NavigationProps';

const LoginScreenContainer = styled.ImageBackground`
  flex: 1;
`;



const LoginScreen = () => {
  const {login} = useAuth();
  const navigation = useNavigation<AuthStackScreenNavigationProps>();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validateEmail, setValidateEmail] = React.useState<boolean>(false);
  const validatedEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidateEmail(re.test(String(email).toLowerCase()));
    setEmail(email);
  };
  const handleRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const onSignIn = () => {
    login(email, password);
  };
  return (
    <LoginScreenContainer
      source={{
        uri: `${IMAGE_BG_LOGIN}`,
      }}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <FormLoginSection
          email={email}
          validatedEmail={validatedEmail}
          password={password}
          setPassword={setPassword}
          validateEmail={validateEmail}
          onSignIn={onSignIn}
          handleRegister={handleRegister}
        />
      </KeyboardAvoidingView>
    </LoginScreenContainer>
  );
};

export default LoginScreen;
