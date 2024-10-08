//import liraries
import React, {FC} from 'react';

import styled from 'styled-components/native';
import {DoHomeWorkContainerProps} from './type';
import ListChapterSection from '../../components/ListChapterSection';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {chooseSubject} from '../../redux/classRoom/selectors';
import {IChapterWithoutExercises, IChapter} from '../../interfaces/Subject';
import {getChapterExercises} from '../../api/subjectApi';
import TextMyfont from '../../components/TextMyfont ';
import {RefreshControl, ScrollView} from 'react-native';
import {GIFJSON} from '../../utils/constant';
import {setListQuestionChapter} from '../../redux/classRoom/actions';
// create a component
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const LoadingContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const LabelChapterSubject = styled(TextMyfont)`
  color: #000;
  align-self: center;
`;

const DoHomeWorkContainer: FC<DoHomeWorkContainerProps> = () => {
  const subject = useSelector(chooseSubject);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [listChapter, setListChapter] = React.useState<
    IChapterWithoutExercises[]
  >([]);
  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    getListChapter();
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    getListChapter();
  }, [subject]);

  const getListChapter = async () => {
    try {
      const res = await getChapterExercises(subject.id);
      if (res.data.status) {
        setIsLoading(false);
        setListChapter(res.data.data.chapters);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <LottieView
            source={GIFJSON.Loading}
            autoPlay
            loop
            speed={1.2}
            style={{width: 100, height: 100}}
          />
        </LoadingContainer>
      ) : listChapter.length <= 0 ? (
        <LabelChapterSubject>Không có dữ liệu</LabelChapterSubject>
      ) : (
        <ListChapterSection data={listChapter} />
      )}
    </Container>
  );
};

//make this component available to the app
export default DoHomeWorkContainer;
