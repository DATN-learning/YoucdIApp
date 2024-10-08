import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import stylesTM from '../../themes/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  chooseClassRoom,
  getSubjectClass,
  chooseSubject as getchooseSubject,
} from '../../redux/classRoom/selectors';
import BottomPopup from '../BottomPopUp';
import ListClassSection from '../ListClassSection';
import {IClass as IClassProps} from '../../models/LearnHome';
import {ISubject} from '../../interfaces/Class';
import ListSubjectPopup from '../ListSubjectPopup';
import { TournamentsHeaderProps } from './type';

const TournamentsHeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  background-color: #fff;
  padding-bottom: 10px;
  padding: 10px 20px;
`;
const MenuLeft = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ContainerMenu = styled.View`
  padding: 10px 20px;
  border-radius: 13px;
  border-width: 2px;
  border-color: #e8e6e6;
  flex-direction: row;
  justify-content: space-between;
`;
const FontSize = styled.Text`
  font-size: 16px;
`;
const BtnSelect = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const NameClass = styled(FontSize)`
  color: #9e80f2;
`;

const TournamentsHeader: React.FC<TournamentsHeaderProps> = props => {
  const classRoom = useSelector(chooseClassRoom);
  const subject = useSelector(getchooseSubject);
  const [isShowPopupClass, setIsShowPopupClass] = React.useState(false);
  const [isShowPopupSubject, setIsShowPopupSubject] = React.useState(false);
  const [dataClass, setDataClass] = React.useState<IClassProps[]>([]);
  const [listSubject, setListSubject] = React.useState<ISubject[]>([]);
  const listClass = useSelector(getSubjectClass);
  React.useEffect(() => {
    setUpData();
  }, [listClass]);

  const setUpData = async () => {
    const classRoom = await listClass.listClass.find(
      item => item.class === listClass.numberClassRoom,
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
      ]);
    });
  };

  return (
    <TournamentsHeaderContainer>
        <MenuLeft>
        <ContainerMenu>
          <BtnSelect
            onPress={() => {
              setIsShowPopupClass(true);
            }}>
            <NameClass style={[stylesTM.fontVR]}>Lớp {classRoom}</NameClass>
            <Entypo name="chevron-right" size={20} color="#9e80f2" />
          </BtnSelect>
        </ContainerMenu>
        <View style={{width: 10}} />
      </MenuLeft>
      <ContainerMenu>
        <BtnSelect onPress={() => {}}>
          <Entypo name="dots-three-vertical" size={20} color="#9e80f2" />
        </BtnSelect>
      </ContainerMenu>

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
        titleStyle={{color: '#000'}}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
    </TournamentsHeaderContainer>
  );
};

export default TournamentsHeader;
