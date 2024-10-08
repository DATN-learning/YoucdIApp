import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import React,{FC} from 'react';
import stylesTM from '../../themes/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {ISelectSubjectProps} from './type';
import { useSelector } from 'react-redux';
import { chooseClassRoom } from '../../redux/classRoom/selectors';
const Container = styled.View`
  width: 100%;
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
const Title = styled(FontSize)`
  color: #000;
`;
const BtnSelect = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const NameClass = styled(FontSize)`
  color: #9e80f2;
`;

const SelectSubject: FC<ISelectSubjectProps> = props => {
  const {isShowPopup,setIsShowPopup}=props;
  const handleChooseClass = () => setIsShowPopup(!isShowPopup);
  const classRoom = useSelector(chooseClassRoom);
  return (
    <Container>
      <Title style={[stylesTM.fontVR]}>Chọn Tài Liệu Học</Title>
      <BtnSelect onPress={handleChooseClass}>
        <NameClass style={[stylesTM.fontVR]}>Lớp {classRoom}</NameClass>
        <Entypo name="chevron-right" size={20} color="#9e80f2" />
      </BtnSelect>
    </Container>
  );
};

export default SelectSubject;
