//import liraries
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCountDown,
  getStopCountDown,
} from '../../redux/gameChapter/selectors';
import {setStopCountDown} from '../../redux/gameChapter/actions';
// create a component

const MenuGameContainer = styled.View`
  width: 100%;
  background-color: #000;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const MenuGameSeciton = () => {
  const countDown = useSelector(getCountDown);
  const dispatch = useDispatch();
  const stopCountDown = useSelector(getStopCountDown);
  return (
    <MenuGameContainer>
      <TouchableOpacity
        onPress={() => {
          dispatch(setStopCountDown(!stopCountDown));
        }}>
        <AntDesign
          name={stopCountDown ? 'playcircleo' : 'pausecircleo'}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      <Text
        style={{
          color: '#fff',
        }}>
        {countDown}
      </Text>
    </MenuGameContainer>
  );
};
//make this component available to the app
export default MenuGameSeciton;
