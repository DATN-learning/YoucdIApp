import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splashscreen from '../screens/Splashscreen';
import AuthNavigation from './Auth/Auth';
import TakePhotoScreen from '../screens/LearnSpace/TakePhotoScreen';
import LearnNavigation from './LearnNavigation';
import ChapterSubjectScreen from '../screens/LearnSpace/ChapterSubjectScreen';
import LessionChapterScreen from '../screens/LearnSpace/LessionChapterScreen';
import DoHomeWorkScreen from '../screens/LearnSpace/DoHomeWorkScreen';
import ListQuestionScreen from '../screens/LearnSpace/ListQuestionScreen';
import Orientation from 'react-native-orientation-locker';
import QuizzStack from './Quiz';
import AnalyzeExercisesScreen from '../screens/LearnSpace/AnalyzeExercisesScreen';
import CreatePostScreen from '../screens/LearnSpace/CreatePostScreen';
import DetailsPostScreen from '../screens/LearnSpace/DetailsPostScreen';
import {Response} from '../mlkit';
import ResultScreen from '../screens/Game/ResultScreen';
import { IChapterWithoutExercises } from '../interfaces/Subject';
export type RootStackParamList = {
  Splashscreen: undefined;
  Authen: undefined;
  LearnNavigation: undefined;
  TakePhotoScreen: undefined;
  ChapterSubjectScreen: undefined;
  LessionChapterScreen: {
    idSubject: string;
    idChapter: string;
    idLession: string;
    numberChapter: string;
    nameLession: string;
  };
  DoHomeWorkScreen: {};
  ListQuestionScreen: { data: IChapterWithoutExercises };
  QuizzStack: undefined;
  AnalyzeExercisesScreen: {
    uriImage: string;
    typeImage: string;
    blocResponse: Response;
  };
  CreatePostScreen: {
    uriImage: string;
    typeImage: string;
    topSuggestions?: string;
    blocResponse: Response;
  };
  DetailsPostScreen: undefined;
  ResultScreen: { 
    // score: string; userAnswers: { is_correct: boolean }[] 
  };
};
const Stack = createStackNavigator<RootStackParamList>();
const RootStack: FC = () => {
  Orientation.lockToPortrait();
  return (
    <Stack.Navigator initialRouteName="Splashscreen">
      <Stack.Screen
        name="Splashscreen"
        component={Splashscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Authen"
        component={AuthNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LearnNavigation"
        component={LearnNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TakePhotoScreen"
        component={TakePhotoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChapterSubjectScreen"
        component={ChapterSubjectScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LessionChapterScreen"
        component={LessionChapterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoHomeWorkScreen"
        component={DoHomeWorkScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListQuestionScreen"
        component={ListQuestionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizzStack"
        component={QuizzStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnalyzeExercisesScreen"
        component={AnalyzeExercisesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsPostScreen"
        component={DetailsPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default RootStack;
