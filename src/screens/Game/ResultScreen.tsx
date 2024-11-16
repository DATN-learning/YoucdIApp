import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../routes/RootStack';
import { useNavigation } from '@react-navigation/native';

const ResultScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const ResultItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
`;

const ResultText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export type ResultScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ResultScreen'
>;

const ResultScreen = ({route, navigation}: any) => {
  const {score, userAnswers} = route.params;
  const navigations = useNavigation<ResultScreenNavigationProps>();

  return (
    <ResultScreenContainer>
      <Text style={{color: '#fff', fontSize: 24}}>Your Results</Text>
      <Text style={{color: '#fff', fontSize: 20}}>Total Score: {score}</Text>
      <FlatList
        data={userAnswers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <ResultItem>
            <ResultText>
              Question {index + 1}: {item.is_correct ? 'Correct' : 'Wrong'}
            </ResultText>
          </ResultItem>
        )}
      />
      <Button title="Go Back to Home" onPress={() => navigation.navigate('Home')} />
    </ResultScreenContainer>
  );
};

export default ResultScreen;
