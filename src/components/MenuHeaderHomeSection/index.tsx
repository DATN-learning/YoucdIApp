import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import stylesTM from '../../themes/styles';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button';
import MenuCamera from './MenuCamera';
import MenuKeyBoard from './MenuKeyBoard';
import MenuTranslate from './MenuTranslate';
const { width, height } = Dimensions.get('window');
const Container = styled.View`
  width: 100%;
  height: ${height * 0.3}px;
  border-bottom-width: 0.5px;
  border-bottom-color: #ccc;
  padding: 0px 0px 10px;
  background-color: #fff;
`;
const Content = styled.View`
  flex: 1;
`;
const MenuContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 2px 20px;
`;
const typeMenu = ['camera', 'keyboard', 'g-translate'];

const MenuHeaderHomeSection = () => {

  const cauroselRef = React.useRef<ScrollView>(null);
  const [menuActive, setMenuActive] = React.useState<string>(typeMenu[0]);
  const changeMenuActive = React.useCallback((nameMenu: string) => {
    if (nameMenu === typeMenu[0]) {
      cauroselRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
    if (nameMenu === typeMenu[1]) {
      cauroselRef.current?.scrollTo({ x: width, y: 0, animated: true });
    }
    if (nameMenu === typeMenu[2]) {
      cauroselRef.current?.scrollTo({ x: width * 2, y: 0, animated: true });
    }
  }, []);
  const scrollTo = React.useCallback((x: number) => {
    const index = Math.round(x / width);
    setMenuActive(typeMenu[index]);
  }, []);

  return (
    <Container>
      <Content>
        <ScrollView
          ref={cauroselRef}
          style={{ flex: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={e => {
            scrollTo(e.nativeEvent.contentOffset.x);
          }}
          pagingEnabled={true}>
          <MenuCamera />
          <MenuKeyBoard
            isActive={menuActive === typeMenu[1]}
          />
          <MenuTranslate />
        </ScrollView>
      </Content>
      <MenuContainer>
        <Button
          nameMenu={typeMenu[0]}
          changeMenuActive={changeMenuActive}
          style={
            menuActive === typeMenu[0]
              ? {
                borderBottomWidth: 2,
                borderBottomColor: '#000',
              }
              : {}
          }
          corlorLinear={['#b5ebe8', '#a4efec', '#69ece6']}>
          <Ionicons name="camera" size={30} color="#fff" />
        </Button>
        <Button
          nameMenu={typeMenu[1]}
          changeMenuActive={changeMenuActive}
          corlorLinear={['#f6d4fa', '#ebaff0', '#ea83f3']}
          style={[
            menuActive === typeMenu[1]
              ? {
                borderBottomWidth: 2,
                borderBottomColor: '#000',
              }
              : {},
            { marginHorizontal: 10 },
          ]}>
          <MaterialIcons name="keyboard" size={30} color="#fff" />
        </Button>
        <Button
          style={
            menuActive === typeMenu[2]
              ? {
                borderBottomWidth: 2,
                borderBottomColor: '#000',
              }
              : {}
          }
          changeMenuActive={changeMenuActive}
          nameMenu={typeMenu[2]}
          corlorLinear={['#f7e4d2', '#f2d2b0', '#f1bb83']}>
          <MaterialIcons name="g-translate" size={30} color="#fff" />
        </Button>
      </MenuContainer>
    </Container>
  );
};

export default MenuHeaderHomeSection;
