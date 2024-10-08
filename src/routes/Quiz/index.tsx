import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orientation from 'react-native-orientation-locker';
import QuizScreen from '../../screens/Game/QuizScreen';
import SplashScreen from '../../screens/Game/SplashScreen';
import PrepareScreenScreen from '../../screens/Game/PrepareScreen';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
export type QuizzStackParamList = {
  SplashScreen: undefined;
  PrepareScreen: undefined;
  QuizScreen: {};
};
const Stack = createStackNavigator<QuizzStackParamList>();
const QuizzStack: FC = () => {
  React.useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToLandscapeRight();
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    };
  }, []);
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrepareScreen"
        component={PrepareScreenScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default QuizzStack;
