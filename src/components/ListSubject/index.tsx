import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import React, {FC} from 'react';
import Subject from './Subject';
import {IListSubjectProps} from './type';
import TextMyfont from '../TextMyfont ';
const ListSubjectContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 80px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Lable = styled(TextMyfont)`
  font-size: 16px;
  color: #000;
`;

const ListSubject: FC<IListSubjectProps> = props => {
  const {data} = props;
  return (
    <ListSubjectContainer>
      {data.length > 0 ? (
        data.map((item, index) => <Subject key={index} subject={item} />)
      ) : (
        <Lable>Không có môn học nào</Lable>
      )}
    </ListSubjectContainer>
  );
};

export default ListSubject;
