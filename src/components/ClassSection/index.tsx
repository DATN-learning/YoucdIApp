import {View, Dimensions} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import {IClassSectionProps} from './type';
import SelectSubject from '../SelectSubject';

import ListSubject from '../ListSubject';
import BottomPopup from '../BottomPopUp';
import ListClassSection from '../ListClassSection';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {getSubjectClass} from '../../redux/classRoom/selectors';
import {GIFJSON} from '../../utils/constant';
import {ISubject, IClass} from '../../interfaces/Class';
import {IClass as IClassProps} from '../../models/LearnHome';
const {width, height} = Dimensions.get('window');
const Container = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 20px;
`;
const LoadingContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ClassSection: FC<IClassSectionProps> = props => {
  const [isShowPopupClass, setIsShowPopupClass] = React.useState(false);
  const [listSubject, setListSubject] = React.useState<ISubject[]>([]);
  const [dataClass, setDataClass] = React.useState<IClassProps[]>([]);
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
    <Container>
      <SelectSubject
        isShowPopup={isShowPopupClass}
        setIsShowPopup={setIsShowPopupClass}
      />
      {listClass.loading ? (
        <LoadingContainer>
          <LottieView
            source={GIFJSON.Loading3}
            autoPlay
            loop
            speed={1.2}
            style={{width: width * 0.3, height: 200}}
          />
        </LoadingContainer>
      ) : (
        <ListSubject data={listSubject} />
      )}
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
    </Container>
  );
};

export default ClassSection;
