import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { TournamentListProps } from './type';
import TournamentCard from './TournamentCard';

const TournamentListContainer = styled.View``;
const TournamentListHeader = styled.View``;
const TournamentListFL = styled.FlatList``;

const dataFake=[
  {
    id: 1,
    name: 'Tournament 1',
    description: 'Description 1',
    image: 'https://picsum.photos/200/300',
    date: '2020-12-12',
  },
  {
    id: 2,
    name: 'Tournament 2',
    description: 'Description 2',
    image: 'https://picsum.photos/200/300',
    date: '2020-12-12',
  },
  {
    id: 3,
    name: 'Tournament 3',
    description: 'Description 3',
    image: 'https://picsum.photos/200/300',
    date: '2020-12-12',
  },
  {
    id: 4,
    name: 'Tournament 4',
    description: 'Description 4',
    image: 'https://picsum.photos/200/300',
    date: '2020-12-12',
  },
]

const TournamentList:React.FC<TournamentListProps> = (props) => {
  return (
    <TournamentListContainer>
      <TournamentListFL
        data={dataFake}
        renderItem={({item}) => <TournamentCard/>}
        keyExtractor={(item, index) => index.toString()}
      />
    </TournamentListContainer>
  );
};

export default TournamentList;