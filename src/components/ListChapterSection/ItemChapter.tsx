//import liraries
import React, {FC} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import Octicons from 'react-native-vector-icons/Octicons';
import TextMyfont from '../TextMyfont ';
import {useNavigation} from '@react-navigation/native';
import {IChapterWithoutExercises} from '../../interfaces/Subject';
import {DoHomeWorkScreenNavigationProps as DoHomeWorkNavigationProps} from '../../screens/LearnSpace/DoHomeWorkScreen';
import {useDispatch} from 'react-redux';
import {
  setChapterEnable,
  setListQuestionChapter,
} from '../../redux/classRoom/actions';
// create a component
const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: #9e80f2;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const NameChapterContainer = styled.View`
  flex-direction: row;
`;
const NameChapter = styled(TextMyfont)`
  color: #fff;
  flex: 1;
`;
const NumQuestion = styled(TextMyfont)`
  color: #fff;
  margin: 0px 10px;
`;

const ItemChapter: FC<IChapterWithoutExercises> = props => {
  const navigation = useNavigation<DoHomeWorkNavigationProps>();
  const dispatch = useDispatch();
  const onPress = async () => {
    props.questions.length > 0
      ? (dispatch(
          setChapterEnable({
            id: props.id,
            name: props.name_chapter_subject,
            number: props.number_chapter,
          }),
        ),
        dispatch(setListQuestionChapter(props.questions)),
        navigation.navigate('ListQuestionScreen', {}))
      : Alert.alert(
          'Thông báo',
          'Có vẻ như chương này chưa sẵn sàng để bạn ôn luyện',
        );
  };
  
  React.useEffect(() => {
    return () => {
      dispatch(setChapterEnable({id: 0, name: '', number: 0}));
    };
  }, []);

  return (
    <>
      <Container onPress={onPress}>
        <NameChapterContainer>
          <NameChapter numberLine={1}>{props.name_chapter_subject}</NameChapter>
          <NumQuestion>{props.questions.length} câu</NumQuestion>
          <Octicons name="chevron-right" size={20} color="#fff" />
        </NameChapterContainer>
      </Container>
    </>
  );
};

//make this component available to the app
export default ItemChapter;
