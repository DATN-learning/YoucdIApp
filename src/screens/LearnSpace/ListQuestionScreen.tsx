//import liraries
import React, {FC} from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootStack';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import TextMyfont from '../../components/TextMyfont ';
import ItemQuestion from '../../components/QuestionSection/ItemQuestion';
import {useSelector} from 'react-redux';
import {getListQuestionChapter} from '../../redux/classRoom/selectors';
// create a component
const ListQuestionScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Content = styled.View`
  flex: 1;
  padding: 10px 20px;
`;
const MenuContainer = styled.View`
  width: 100%;
  padding: 10px 0px;
  border-bottom-width: 0.5px;
  border-bottom-color: #9e80f2;
  margin-bottom: 10px;
`;
const BtnStart = styled.TouchableOpacity`
  width: 100%;
  background-color: #9e80f2;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  border-radius: 10px;
`;
const LableBtn = styled(TextMyfont)`
  font-size: 20px;
  color: #fff;
`;

export type ListQuestionScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'ListQuestionScreen'
>;

const ListQuestionScreen: FC = () => {
  const navigation = useNavigation<ListQuestionScreenNavigationProps>();
  const goBack = () => navigation.goBack();
  const handleStart = () => navigation.navigate('QuizzStack');
  const listQuestionChapter = useSelector(getListQuestionChapter);
  const label = `Câu Hỏi Chương`;
  return (
    <ListQuestionScreenContainer>
      <HeaderScreenSection
        label={label}
        onPressGoBack={goBack}
      />
      <Content>
        <MenuContainer>
          <BtnStart onPress={handleStart}>
            <LableBtn>Bắt Đầu</LableBtn>
          </BtnStart>
        </MenuContainer>
        <FlatList
          data={listQuestionChapter}
          renderItem={({item}) => <ItemQuestion {...item} disable={true} />}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => <View style={{height: 200}} />}
        />
      </Content>
    </ListQuestionScreenContainer>
  );
};

//make this component available to the app
export default ListQuestionScreen;
