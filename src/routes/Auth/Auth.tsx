import React, { FC, FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//?import screens
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import FogotPassScreen from '../../screens/Auth/FogotPassScreen';
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  FogotPassScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
    >
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FogotPassScreen"
        component={FogotPassScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
