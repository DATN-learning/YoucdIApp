import {View, Text} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import {IListSuggestSectionProps} from './type';
import TextMyfont from '../TextMyfont ';
import {AppColors} from '../../utils/constant';
const ListSuggestSectionContainer = styled.View`
  flex-direction: row;
`;
const ListSuggestContainer = styled.ScrollView`
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props: {isActive?: boolean}) =>
    props.isActive ? AppColors.purple : '#fff'};
  margin: 5px;
`;
const BtnLabel = styled(TextMyfont)`
  color: ${(props: {isActive?: boolean}) =>
    props.isActive ? '#fff' : AppColors.purple};
`;

const ListSuggestSection: FC<IListSuggestSectionProps> = props => {
  const {data, label, setTopSuggestions} = props;

  const renderListSuggest = () => {
    return data.map((item, _) => {
      return (
        <Btn
          key={item}
          onPress={() => setTopSuggestions(item)}
          isActive={item === label}>
          <BtnLabel isActive={item === label}>{item}</BtnLabel>
        </Btn>
      );
    });
  };

  return (
    <>
      <ListSuggestSectionContainer>
        <ListSuggestContainer horizontal>
          {renderListSuggest()}
        </ListSuggestContainer>
        <Btn style={{backgroundColor: AppColors.purple}}>
          <BtnLabel style={{color: '#fff'}}>Khác</BtnLabel>
        </Btn>
      </ListSuggestSectionContainer>
    </>
  );
};

export default ListSuggestSection;
