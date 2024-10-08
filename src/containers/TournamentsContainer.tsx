import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import TournamentList from '../components/TournamentList';

const TournamentsViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px 20px;
`;

interface TournamentsContainerProps {}

const TournamentsContainer: React.FC<TournamentsContainerProps> = props => {
  return (
    <TournamentsViewContainer>
      <TournamentList/>
    </TournamentsViewContainer>
  );
};

export default TournamentsContainer;
