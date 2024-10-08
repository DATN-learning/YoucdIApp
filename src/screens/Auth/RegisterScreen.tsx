import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import {IMAGE_BG_LOGIN} from '../../utils/constant';
import {useAuth} from '../../configs/AuthProvider';
import FormRegisterSection from '../../components/FormRegister/FormRegisterSection';

const RegisterScreenContainer = styled.ImageBackground`
  flex: 1;
`;

const RegisterScreen: FC = () => {
  const {register} = useAuth();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [firtName, setFirtName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [validateEmail, setValidateEmail] = React.useState<boolean>(false);
  const validatedEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidateEmail(re.test(String(email).toLowerCase()));
    setEmail(email);
  };
 
  const onRegister = () => {
    register(firtName, lastName, email, password)
  };

  return (
    <RegisterScreenContainer
      source={{
        uri: `${IMAGE_BG_LOGIN}`,
      }}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <FormRegisterSection
          email={email}
          validatedEmail={validatedEmail}
          password={password}
          setPassword={setPassword}
          firstName={firtName}
          setFirstName={setFirtName}
          lastName={lastName}
          setLastName={setLastName}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          validateEmail={validateEmail}
          onRegister={onRegister}
        />
      </KeyboardAvoidingView>
    </RegisterScreenContainer>
  );
};

export default RegisterScreen;
