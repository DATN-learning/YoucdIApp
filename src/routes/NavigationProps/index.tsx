import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {LearnNavigationParamList} from '../LearnNavigation';
import {QAndAStackParamList} from '../QAndA/QAndA';
import { AuthStackParamList } from '../Auth/Auth';

export type QAndALearnScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'LearnNavigation'>,
  CompositeNavigationProp<
    BottomTabScreenProps<LearnNavigationParamList, 'QAndAStack'>['navigation'],
    NativeStackNavigationProp<QAndAStackParamList>
  >
>;
export type AuthStackScreenNavigationProps = NativeStackNavigationProp<AuthStackParamList, 'LoginScreen'>;

export type AnalyzeExercisesScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'AnalyzeExercisesScreen'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;

export type CreatePostScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'CreatePostScreen'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;

export type TakePhotoScreenNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'TakePhotoScreen'>,
  BottomTabScreenProps<LearnNavigationParamList, 'Home'>['navigation']
>;
