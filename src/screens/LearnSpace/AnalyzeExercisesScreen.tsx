//import liraries
import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HeaderScreenSection from '../../components/HeaderScreenSection';
import { AnalyzeExercisesScreenNavigationProps } from '../../routes/NavigationProps';
import { RootStackParamList } from '../../routes/RootStack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TextMyfont from '../../components/TextMyfont ';
import { useDispatch, useSelector } from 'react-redux';
import {
  chooseClassRoom,
  chooseSubject as getchooseSubject,
  getSubjectClass,
} from '../../redux/classRoom/selectors';
import { chooseSubject } from '../../redux/classRoom/actions';
import { useAuth } from '../../configs/AuthProvider';
import BottomPopup from '../../components/BottomPopUp';
import ListClassSection from '../../components/ListClassSection';
import { IClass as IClassProps } from '../../models/LearnHome';
import ListSubjectPopup from '../../components/ListSubjectPopup';
import { ISubject } from '../../interfaces/Class';
import SuggestExercisesSection from '../../components/SuggestExercisesSection';
// create a component
const AnalyzeExercisesScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const AnalyzeExercisesContentContainer = styled.View`
  flex: 1;
  padding: 0px 10px;
`;
const Image = styled.Image`
  width: 100%;
  height: 10%;
`;
const BottomMenuContainer = styled.View`
  flex-direction: row;
  margin: 10px;
  border-radius: 10px;
  padding: 5px;
  background-color: rgba(158, 128, 242, 0.5);
`;
const BtnItem = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  align-items: center;
  background-color: ${(props: { color: string }) => props.color};
  justify-content: center;
  margin: 5px;
  border-radius: 10px;
`;
const BtnLabel = styled(TextMyfont)`
  color: #fff;
`;
const Label = styled(TextMyfont)`
  color: #000;
`;
const MenuSelectClassAndSubject = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ContainerMenu = styled.View`
  padding: 10px 20px;
  border-radius: 13px;
  border-width: 2px;
  border-color: #e8e6e6;
  flex-direction: row;
  justify-content: space-between;
`;
const BtnSelect = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const NameClass = styled(TextMyfont)`
  color: #9e80f2;
`;

const AnalyzeExercisesScreen = () => {
  const navigation = useNavigation<AnalyzeExercisesScreenNavigationProps>(); //
  const route = useRoute<RouteProp<RootStackParamList, 'AnalyzeExercisesScreen'>>(); //
  const { isAuthenticated } = useAuth();
  const goBack = () => navigation.navigate('LearnNavigation');
  const [topSuggestions, setTopSuggestions] = React.useState<string>('');
  const [listSuggest, setListSuggest] = React.useState<string[]>([]);
  const classRoom = useSelector(chooseClassRoom);
  const subject = useSelector(getchooseSubject);
  const [isShowPopupClass, setIsShowPopupClass] = React.useState<boolean>(false);
  const [dataClass, setDataClass] = React.useState<IClassProps[]>([]);
  const [listSubject, setListSubject] = React.useState<ISubject[]>([]);
  const [isShowPopupSubject, setIsShowPopupSubject] = React.useState<boolean>(false);
  const listClass = useSelector(getSubjectClass);
  const dispatch = useDispatch();
  const label = 'Phân tích bài tập';
  const subLabel = 'Chọn lớp và môn để kết quả chính xác nhất';

  React.useEffect(() => {
    setUpData();
  }, [listClass]);

  React.useEffect(() => {
    (async () => {
      const classRoom = await listClass.listClass.find(
        item => item.class === listClass.numberClassRoom,
      );
      classRoom?.subjects && classRoom?.subjects.length > 0
        ? dispatch(
          chooseSubject({
            id: classRoom?.subjects[0].id_subject.toString(),
            id_relation: classRoom?.subjects[0].id,
            name: classRoom?.subjects[0].name_subject,
          }),
        )
        : dispatch(
          chooseSubject({
            id: '',
            id_relation: -1,
            name: '',
          }),
        );
    })();
  }, [classRoom]);

  const setUpData = async () => {
    const classRoom = listClass.listClass.find(
      item => item.class === listClass.numberClassRoom
    );
    setListSubject(classRoom?.subjects || []);
    setDataClass([]);
    listClass.listClass.map(item => {
      setDataClass(dataClass => [
        ...dataClass,
        {
          id: item.id.toString(),
          name: item.name_class,
          number: item.class,
        },
      ] || []);
    });
  };

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      navigation.navigate('Authen');
      return;
    } else {
      navigation.navigate('CreatePostScreen', {
        blocResponse: route.params.blocResponse,
        uriImage: route.params.uriImage,
        typeImage: route.params.typeImage,
        topSuggestions: topSuggestions,
      });
    }
  };

  return (
    <AnalyzeExercisesScreenContainer>
      <HeaderScreenSection label={label} onPressGoBack={goBack} />
      <AnalyzeExercisesContentContainer>
        <Image
          source={{
            uri: route.params.uriImage,
          }}
          resizeMode="contain"
        />
        <Label>{subLabel}</Label>
        <MenuSelectClassAndSubject>
          <ContainerMenu>
            <BtnSelect
              onPress={() => {
                setIsShowPopupClass(true);
              }}>
              <NameClass>Lớp:{classRoom}</NameClass>
              <Entypo name="chevron-down" size={20} color="#9e80f2" />
            </BtnSelect>
          </ContainerMenu>
          <View style={{ width: 10 }} />
          <ContainerMenu>
            <BtnSelect
              onPress={() => {
                setIsShowPopupSubject(true);
              }}>
              <NameClass>Môn:{subject.name}</NameClass>
              <Entypo name="chevron-down" size={20} color="#9e80f2" />
            </BtnSelect>
          </ContainerMenu>
        </MenuSelectClassAndSubject>
        <Label>Kết quả phân tích</Label>

        <SuggestExercisesSection
          listSuggest={listSuggest}
          setListSuggest={setListSuggest}
          topSuggestions={topSuggestions}
          setTopSuggestions={setTopSuggestions}
        />
      </AnalyzeExercisesContentContainer>

      <BottomMenuContainer>
        <BtnItem color="#69ece6" onPress={handleCreatePost}>
          <BtnLabel>Đặt câu hỏi</BtnLabel>
        </BtnItem>
        <BtnItem color="#ea83f3">
          <BtnLabel>Chọn lại bài</BtnLabel>
        </BtnItem>
      </BottomMenuContainer>
      <BottomPopup
        visible={isShowPopupClass}
        setVisible={setIsShowPopupClass}
        children={
          <ListClassSection
            data={dataClass}
            setIsShowPopupClass={setIsShowPopupClass}
          />
        }
        title="Chọn lớp học"
        titleStyle={{ color: '#000' }}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
      <BottomPopup
        visible={isShowPopupSubject}
        setVisible={setIsShowPopupSubject}
        children={
          <ListSubjectPopup
            data={listSubject}
            setIsShowPopupSubject={setIsShowPopupSubject}
            isBtnChooseAll={false}
          />
        }
        title="Chọn Môn Học"
        titleStyle={{ color: '#000' }}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
    </AnalyzeExercisesScreenContainer>
  );
};

//make this component available to the app
export default AnalyzeExercisesScreen;
