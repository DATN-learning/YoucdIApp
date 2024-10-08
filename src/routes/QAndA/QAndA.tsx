//import liraries
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QAndAScreen from '../../screens/LearnSpace/QAndAScreen';
import DetailsPostScreen from '../../screens/LearnSpace/DetailsPostScreen';

// create a component
export type QAndAStackParamList = {
  QAndAScreen: undefined;
  DetailsPostScreen: undefined;
};

const Stack = createStackNavigator<QAndAStackParamList>();

const QAndAStack = () => {
  return (
    <Stack.Navigator initialRouteName="QAndAScreen">
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
        }}
        name="QAndAScreen"
        component={QAndAScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DetailsPostScreen"
        component={DetailsPostScreen}
      />
    </Stack.Navigator>
  );
};

//make this component available to the app
export default QAndAStack;
