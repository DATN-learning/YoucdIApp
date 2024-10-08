import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import React, {FC} from 'react';
import BottomPopup from '../BottomPopUp';
import {ISubjectProps} from './type';
import ListClassSection from '../ListClassSection';
import Feather from 'react-native-vector-icons/Feather';
import ListMenuSubjectSection from '../ListMenuSubjectSection';
import {useDispatch} from 'react-redux';
import {chooseSubject} from '../../redux/classRoom/actions';
const {width, height} = Dimensions.get('window');
const SubjectContainer = styled.TouchableOpacity`
  width: ${(width - 40) / 4}px;
  align-items: center;
  margin-bottom: 10px;
`;

const LogoSubject = styled.Image`
  width: 50px;
  height: 50px;
`;

const SubjectText = styled.Text`
  font-size: 16px;
  margin-top: 7px;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

const SubjectMemory: FC<ISubjectProps> = props => {
  const {subject} = props;
  const dispatch = useDispatch();
  const [isShowPopupSubject, setIsShowPopupSubject] = React.useState(false);
  const handleShowPopupSubject = async () => {
    setIsShowPopupSubject(true);
    setTimeout(() => {
      dispatch(
        chooseSubject({
          name: subject.name_subject,
          id: subject.id_subject,
          id_relation: subject.id,
        }),
      );
    }, 100);
  };

  return (
    <>
      <SubjectContainer onPress={handleShowPopupSubject}>
        <LogoSubject
          source={{
            uri: subject.logo_image,
          }}
        />
        <SubjectText numberOfLines={2}>{subject.name_subject}</SubjectText>
      </SubjectContainer>
      <BottomPopup
        visible={isShowPopupSubject}
        animationType='fade'
        setVisible={setIsShowPopupSubject}
        children={
          <ListMenuSubjectSection
            setIsShowPopupSubject={setIsShowPopupSubject}
          />
        }
        title="Chọn hình thức học"
        titleStyle={{color: '#000'}}
        iconMinus={<Feather name="chevron-down" size={20} color="#000" />}
      />
    </>
  );
};

const Subject = React.memo(SubjectMemory);

export default Subject;
