//import liraries
import React, {FC} from 'react';
import {View, Text, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootStack';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import TextMyfont from '../../components/TextMyfont ';
import ItemQuestion from '../../components/QuestionSection/ItemQuestion';
import {useSelector} from 'react-redux';
import {getListQuestionChapter} from '../../redux/classRoom/selectors';
import { IScore } from '../../interfaces/Score';
import { getPointChapter } from '../../api/scoreApi';
import { useAuth } from '../../configs/AuthProvider';
import { IChapter, IChapterWithoutExercises } from '../../interfaces/Subject';
import PulsingScore from '../../components/PulsingScore';
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
  const [scores, setScore] = React.useState<IScore | null>(null);
  const listQuestionChapter = useSelector(getListQuestionChapter);
  const {user} = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, 'ListQuestionScreen'>>();
  const data = route.params?.data;

  const goBack = () => navigation.goBack();

  const handleStart = () => navigation.navigate('QuizzStack');

  const ListPointScore = async () => {
    if (!data || !data.id_chapter_subject) {
      console.error('Không tìm thấy id_chapter_subject để lấy điểm.');
      return;
    }
    try {
      const response = await getPointChapter(user.id, data.id_chapter_subject);
  
      if (response.data.status) {
        if (response.data.data) {
          setScore(response.data.data);
        } else {
          console.log('Không có điểm nào cho chương này.');
          setScore(null);
        }
      } else {
        console.error(response.data.message || 'Không thể lấy điểm');
      }
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
    }
  };
  

  React.useEffect(() => {
    if (data && data.id_chapter_subject) {
      ListPointScore();
    } else {
      console.error('Không tìm thấy dữ liệu chương.');
    }
  }, [data]);
  

  const label = `Câu Hỏi Chương`;

  return (
    <ListQuestionScreenContainer>
      <HeaderScreenSection label={label} onPressGoBack={goBack} />
      <Content>
        <MenuContainer>
          {scores ? (
            <PulsingScore score={scores.score} />
          ) : ""}
          <BtnStart onPress={handleStart}>
            {
              scores ? <LableBtn>Bạn có muốn làm lại không?</LableBtn> : <LableBtn>Bắt Đầu</LableBtn>
            }
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

export default ListQuestionScreen;