import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import TournamentsHeader from '../../components/TournamentsHeader';
import ChatContainer from '../../containers/TournamentsContainer';

const TournamentsScreenContainer = styled.View`
    flex: 1;
    background-color: #fff;
`;

const TournamentsScreen = () => {

  return (
    <TournamentsScreenContainer>
      <TournamentsHeader/>
      <ChatContainer/>
    </TournamentsScreenContainer>
  );
};

export default TournamentsScreen;
