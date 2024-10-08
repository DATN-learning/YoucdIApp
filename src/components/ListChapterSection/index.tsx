//import liraries
import React, {FC} from 'react';
import {RefreshControl, View} from 'react-native';
import styled from 'styled-components/native';
import {ListChapterSectionProps} from './type';
import ItemChapter from './ItemChapter';
import TextMyfont from '../TextMyfont ';
import {FlatList} from 'react-native';
// create a component

const Container = styled.View`
  padding: 10px 20px;
`;

const BtnContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #d6f29e;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
`;
const Text = styled(TextMyfont)`
  color: #fff;
  font-size: 16px;
`;
const FlatListContainer = styled.FlatList`
  width: 100%;
`;

const ListChapterSection: FC<ListChapterSectionProps> = props => {
  const {data} = props;
  return (
    <Container>
      <FlatListContainer
        data={data}
        ListHeaderComponent={
          <BtnContainer>
            <Text>Tất Cả Các Câu Hỏi</Text>
          </BtnContainer>
        }
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        renderItem={({item}: any) => <ItemChapter {...item} />}
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={() => <View style={{height: 200}} />}
      />
    </Container>
  );
};

//make this component available to the app
export default ListChapterSection;
