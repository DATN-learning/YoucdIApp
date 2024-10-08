import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextMyfont from '../TextMyfont ';
import {IHeaderScreenProps} from './type';
// create a component
const HeaderChapterSubjectSectionContainer = styled.View`
  width: 100%;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
`;

const Label = styled(TextMyfont)`
  font-size: 20px;
  color: #9e80f2;
  flex: 1;
`;

const HeaderScreenSection: FC<IHeaderScreenProps> = props => {
  const navigation = useNavigation();
  const {label, onPressGoBack, isViewHeader, viewComponent} = props;
  return (
    <HeaderChapterSubjectSectionContainer>
      <TouchableOpacity onPress={onPressGoBack ?? navigation.goBack}>
        <Feather name="chevron-left" size={30} color={'#9e80f2'} />
      </TouchableOpacity>

      {!isViewHeader && <Label>{label}</Label>}
      {isViewHeader && viewComponent}
    </HeaderChapterSubjectSectionContainer>
  );
};

//make this component available to the app
export default HeaderScreenSection;
