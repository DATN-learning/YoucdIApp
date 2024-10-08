import {StatusBar, ScrollView} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import QAndAMenuHeader from '../../components/QAndAMenuHeader';
import QAndAContainer from '../../containers/QAndAContainer';

const QAndAScreenContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const QAndAScreen: FC = () => {
  return (
    <QAndAScreenContainer>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <QAndAMenuHeader />
      <QAndAContainer />
    </QAndAScreenContainer>
  );
};

export default QAndAScreen;
