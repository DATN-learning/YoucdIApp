//import liraries
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {TabView} from '../../containers/PersonalContainer';
import {MenuTabPersonalScreenProps} from './type';
// create a component
const MenuTabPersonalScreenContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 0px 0px;
  align-items: center;
`;
const MenuTab = styled.View`
  flex: 1;
  flex-direction: row;
`;

const BtnTab = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: ${(props: {onActive: boolean}) =>
    props.onActive ? 4 : 2}px;
  border-bottom-color: ${(props: {onActive: boolean}) =>
    props.onActive ? '#9e80f2' : '#e8e6e6'};
`;
const BtnTabText = styled(TextMyfont)`
  color: ${(props: {onActive: boolean}) =>
    props.onActive ? '#9e80f2' : '#e8e6e6'};
`;
const BtnSetting = styled.TouchableOpacity`
  margin-right: 10px;
`;
const MenuTabPersonalScreen: FC<MenuTabPersonalScreenProps> = props => {
  const {tabIndex, setTabIndex} = props;
  return (
    <MenuTabPersonalScreenContainer>
      <MenuTab>
        {TabView.map((item, index) => {
          return (
            <BtnTab
              key={index}
              onPress={() => setTabIndex(item.index)}
              onActive={tabIndex === item.index}>
              <BtnTabText onActive={tabIndex === item.index}>
                {item.name}
              </BtnTabText>
            </BtnTab>
          );
        })}
      </MenuTab>
      <BtnSetting>
        <Ionicons name="settings-outline" size={30} color="#000" />
      </BtnSetting>
    </MenuTabPersonalScreenContainer>
  );
};

//make this component available to the app
export default MenuTabPersonalScreen;
