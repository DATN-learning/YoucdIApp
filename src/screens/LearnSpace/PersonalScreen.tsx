//import liraries
import React, {FC} from 'react';
import {StatusBar, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import PersonalContainer from '../../containers/PersonalContainer';
// create a component
const PersonalScreenContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const PersonalScreen: FC = () => {
  return (
    <PersonalScreenContainer>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <PersonalContainer />
    </PersonalScreenContainer>
  );
};

//make this component available to the app
export default PersonalScreen;
