//import liraries
import React, {FC} from 'react';
import {View, VirtualizedList} from 'react-native';
import styled from 'styled-components/native';
import {ListSlideSectionProps} from './type';
import ItemSLide from './ItemSLide';
// create a component
const ListSlileContainer = styled.View``;

const ListSlideSection: FC<ListSlideSectionProps> = props => {
  const {data, indexSlideShow, setIndexSlideShow} = props;
  return (
    <ListSlileContainer>
      <VirtualizedList
        data={data}
        renderItem={({item,index}: any) => <ItemSLide slide={item} isShow={index==indexSlideShow} setIndexSlideShow={setIndexSlideShow} index={index} />}
        keyExtractor={(item: any) => item.id.toString()}
        horizontal={true}
        getItemCount={(data: any) => data.length}
        getItem={(data: any, index: number) => data[index]}
      />
    </ListSlileContainer>
  );
};

//make this component available to the app
export default ListSlideSection;
