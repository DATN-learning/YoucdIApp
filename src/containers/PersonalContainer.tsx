//import liraries
import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import MenuTabPersonalScreen from './../components/MenuTabPersonalScreen/index';
import IndividualTabView from '../components/IndividualTabView';
// create a component
const {width} = Dimensions.get('window');
const PersonalViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const TabContentContainer = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

interface TabViewProps {
  index: number;
  name: string;
  component: JSX.Element;
}

export const TabView: TabViewProps[] = [
  {
    index: 0,
    name: 'Cá Nhân',
    component: <IndividualTabView />,
  },
  {
    index: 1,
    name: 'Nhóm Của Tôi',
    component: <IndividualTabView />,
  },
];

const PersonalContainer = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(TabView[0].index);
  return (
    <PersonalViewContainer>
      <MenuTabPersonalScreen tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <TabContentContainer
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          const {contentOffset} = event.nativeEvent;
          const index = Math.round(contentOffset.x / width);
          setTabIndex(index);
        }}>
        {TabView.map((item, index) => {
          return <View key={index}>{item.component}</View>;
        })}
      </TabContentContainer>
    </PersonalViewContainer>
  );
};

//make this component available to the app
export default PersonalContainer;
