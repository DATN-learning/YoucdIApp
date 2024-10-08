//import liraries
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
import {chooseSubject} from '../../redux/classRoom/actions';
// create a component
const QAndAMenuHeaderContainer = styled.View`
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

const QAndAMenuHeader = () => {
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

  // React.useEffect(() => {
  //   (async () => {
  //     const classRoom = await listClass.listClass.find(
  //       item => item.class === listClass.numberClassRoom,
  //     );
  //     classRoom?.subjects && classRoom?.subjects.length > 0
  //       ? dispatch(
  //           chooseSubject({
  //             id: classRoom?.subjects[0].id_subject.toString(),
  //             id_relation: classRoom?.subjects[0].id,
  //             name: classRoom?.subjects[0].name_subject,
  //           }),
  //         )
  //       : dispatch(
  //           chooseSubject({
  //             id: '',
  //             id_relation: -1,
  //             name: '',
  //           }),
  //         );
  //   })();
  // }, [classRoom]);

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
      ] || []);
    });
  };

  return (
    <QAndAMenuHeaderContainer>
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
        <ContainerMenu>
          <BtnSelect
            onPress={() => {
              setIsShowPopupSubject(true);
            }}>
            <NameClass style={[stylesTM.fontVR]}>
              {subject.id_relation > -1
                ? subject.id_relation === 0
                  ? 'Tất cả'
                  : subject.name
                : 'Chọn môn học'}
            </NameClass>
            <Entypo name="chevron-right" size={20} color="#9e80f2" />
          </BtnSelect>
        </ContainerMenu>
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
        animationType='slide'
        title="Chọn lớp học"
        titleStyle={{color: '#000'}}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
      <BottomPopup
        visible={isShowPopupSubject}
        setVisible={setIsShowPopupSubject}
        children={
          <ListSubjectPopup
            data={listSubject}
            setIsShowPopupSubject={setIsShowPopupSubject}
            isBtnChooseAll={true}
          />
        }
        title="Chọn Môn Học"
        titleStyle={{color: '#000'}}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
    </QAndAMenuHeaderContainer>
  );
};

//make this component available to the app
export default QAndAMenuHeader;
