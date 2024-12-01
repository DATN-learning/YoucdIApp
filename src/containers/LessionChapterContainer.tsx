//import liraries
import React, {Component} from 'react';
import styled from 'styled-components/native';
import PDFViewer from '../components/PDFViewer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../routes/RootStack';
import LottieView from 'lottie-react-native';
import {GIFJSON} from '../utils/constant';
import Entypo from 'react-native-vector-icons/Entypo';
import {getLessionById} from '../api/subjectApi';
import {ILession} from '../interfaces/Lession';
import {Alert, FlatList, Animated, View, TouchableOpacity} from 'react-native';
import TextMyfont from '../components/TextMyfont ';
import ListSlideSection from '../components/ListSlideSection';
import ItemQuestion from '../components/QuestionSection/ItemQuestion';
import { startView } from '../api/viewApi';
import { useAuth } from '../configs/AuthProvider';
// create a component

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const SlideContainer = styled(Animated.View)`
  flex: 1;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
`;
const ContentContainer = styled.View`
  flex: 2;
`;
const LoadingContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const NameLession = styled(TextMyfont)`
  color: #000;
  font-size: 20px;
  align-self: center;
`;
const NameSlide = styled(TextMyfont)`
  color: #9e80f2;
  font-size: 16px;
  margin-left: 10px;
`;
const LabelContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px;
`;
const Label = styled(TextMyfont)`
  color: #000;
  font-size: 16px;
`;
const ListQuestionContainer = styled.View`
  width: 100%;
  padding: 0px 20px;
`;

const LessionChapterContainer = () => {
  const [translateY] = React.useState(new Animated.Value(0));
  const {user } = useAuth();
  const route =
    useRoute<RouteProp<RootStackParamList, 'LessionChapterScreen'>>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [lession, setLession] = React.useState<ILession>();
  const [indexSlideShow, setIndexSlideShow] = React.useState<any>(0);
  const [hideSlide, setHideSlide] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    getLession();
  }, [route.params.idLession, route.params.idChapter]);

  const handleStartView = async () => {
    if (!user?.id) {
      console.warn('User not logged in, skipping startView API call');
      return;
    }

    // Lưu thời gian bắt đầu
    setStartTime(Date.now());

    try {
      const res = await startView({
        view_id: `view-${route.params.idLession}`,
        user_id: user?.id,
        id_view_query: lession?.id_lesstion_chapter || "",
        time_view: 0,
      });
      console.log('startView API called successfully',res.data.data);
    } catch (err) {
      console.error('Failed to call startView API:', err);
    }
  };

  const sendEndView = async (elapsedTime: number) => {
    try {
      await startView({
        view_id: `view-${route.params.idLession}`,
        user_id: user?.id,
        id_view_query: lession?.id_lesstion_chapter || "",
        time_view: elapsedTime,
      });
      console.log(`Successfully sent time_view: ${elapsedTime} seconds`);
    } catch (err) {
      console.error('Failed to update time_view:', err);
    }
  };

  React.useEffect(() => {
    if(user.id && lession){
      handleStartView();
      return () => {
        if (startTime) {
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000); 
          sendEndView(elapsedTime); 
        }
      };
    }
  }, [user.id, lession]);

  const getLession = async () => {
    setIsLoading(true);
    try {
      const res = await getLessionById(
        Number(route.params.idLession),
        Number(route.params.idChapter),
      );
      res.status === 200 && res.data.status == true
        ? (setLession(res.data.data.lession), setIsLoading(false))
        : null;
    } catch (e) {
      Alert.alert('Thông báo', 'Không thể kết nối đến máy chủ');
      console.log(e);
    }
  };
  React.useEffect(() => {
    setHideSlide(false);
  }, [indexSlideShow]);

  const animatedEvent = () => {
    Animated.spring(translateY, {
      toValue: hideSlide ? 0 : -500,
      useNativeDriver: true,
    }).start();
    setHideSlide(!hideSlide);
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
      ) : (
        <>
          <NameLession>
            {lession?.name_lesstion_chapter}
            {''}
          </NameLession>
          {lession?.pdfFiles && lession?.pdfFiles.length > 0 && !hideSlide ? (
            <>
              <SlideContainer
                style={{
                  transform: [
                    {
                      translateY: translateY,
                    },
                  ],
                }}>
                <PDFViewer
                  url={
                    lession && lession.pdfFiles.length > 0
                      ? lession?.pdfFiles[indexSlideShow].pdf_file
                      : ''
                  }
                />
              </SlideContainer>
            </>
          ) : null}
          <ContentContainer>
            {lession?.pdfFiles &&
              lession?.pdfFiles.length > 0 &&
              !hideSlide && (
                <NameSlide numberLine={2}>
                  Slide:{lession?.pdfFiles[indexSlideShow]?.url_pdf}
                </NameSlide>
              )}
            <ListSlideSection
              data={
                lession?.pdfFiles && lession?.pdfFiles.length > 0
                  ? lession?.pdfFiles
                  : []
              }
              indexSlideShow={indexSlideShow}
              setIndexSlideShow={setIndexSlideShow}
            />
            {lession?.questions && lession?.questions.length > 0 && (
              <LabelContainer>
                <Label>Các bài tập ví dụ : </Label>
                <TouchableOpacity
                  onPress={() => {
                    animatedEvent();
                  }}>
                  <Entypo
                    name={hideSlide ? 'chevron-down' : 'chevron-up'}
                    size={20}
                    color="#9e80f2"
                  />
                </TouchableOpacity>
              </LabelContainer>
            )}
            <ListQuestionContainer>
              <FlatList
                data={lession?.questions}
                renderItem={({item}) => <ItemQuestion {...item} />}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={() => <View style={{height: 200}} />}
              />
            </ListQuestionContainer>
          </ContentContainer>
        </>
      )}
    </Container>
  );
};

//make this component available to the app
export default LessionChapterContainer;
