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

const ResultScreen = ({ route, navigation }: any) => {
  const { score = 0, userAnswers = [] } = route.params || {};

  console.log('Route Params:', route.params);

  return (
    <ResultScreenContainer>
      <Text style={{ color: '#fff', fontSize: 24 }}>Kết quả</Text>
      <Text style={{ color: '#fff', fontSize: 20 }}>Điểm: {score}</Text>
      <FlatList
        data={userAnswers}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ResultItem>
            <ResultText>
              Câu {index + 1}: {item.is_correct ? 'Đúng' : 'Sai'}
            </ResultText>
          </ResultItem>
        )}
      />
      <Button title="Quay lại trang chủ" onPress={() => navigation.navigate('Home')} />
    </ResultScreenContainer>
  );
};


export default ResultScreen;
