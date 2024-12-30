//import liraries
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { SuggestExercisesSectionProps } from './type';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AnalyzeExercisesScreenNavigationProps } from '../../routes/NavigationProps';
import { RootStackParamList } from '../../routes/RootStack';
import { useSocket } from '../../configs/SocketProvider';
import ListSuggestSection from '../ListSuggestSection';
import { useSelector } from 'react-redux';
import {
  chooseClassRoom,
  chooseSubject,
  getSubjectClass,
} from '../../redux/classRoom/selectors';
import { IPostSuggestion } from '../../interfaces/Post';
import ItemPostSuggest from './ItemPostSuggest';
// create a component
const SuggestExercisesSectionContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const ListPostContainer = styled.FlatList``;

const SuggestExercisesSection: FC<SuggestExercisesSectionProps> = props => {
  const { socket } = useSocket();
  const classRoom = useSelector(chooseClassRoom);
  const classRoomid = useSelector(getSubjectClass).listClass.find(
    item => item.class === classRoom,
  )?.id;
  const subject = useSelector(chooseSubject);
  const { listSuggest, setListSuggest, setTopSuggestions, topSuggestions } = props;
  const navigation = useNavigation<AnalyzeExercisesScreenNavigationProps>(); //
  const route = useRoute<RouteProp<RootStackParamList, 'AnalyzeExercisesScreen'>>();
  const [listText, setListText] = React.useState<string[]>([]);
  const [postSuggestions, setPostSuggestions] = React.useState<
    IPostSuggestion[]
  >([]); 

  React.useEffect(() => {
    const listTextBlock = route.params.blocResponse.blocks.map(item => {
      return item.text;
    });
    setListText(listTextBlock);
  }, [route.params.blocResponse]);

  React.useEffect(() => {
    topSuggestions && AnalyzeExercises();
  }, [topSuggestions, classRoom, subject]);

  React.useEffect(() => {
    listText.length > 0 && suggestExercises();
  }, [listText]);

  const suggestExercises = () => {
    socket.emit('suggest_exercises', listText);
  };

  React.useEffect(() => {
    socket.on('suggest_exercises', data => {
      setTopSuggestions(data.lable); // gợi ý chính xác nhất
      const listSuggest = [data.lable, ...data.listCategory]; //danh sách các bài post liên quan
      const listSuggestFilter = listSuggest.filter((item, index) => {
        return listSuggest.indexOf(item) === index;
      });
      setListSuggest(listSuggestFilter || []);
    });
    socket.on('analyze_exercises', data => {
      console.log(data);
      setPostSuggestions(data.data || []);
    });
  }, [socket]);

  const AnalyzeExercises = () => {
    socket.emit('analyze_exercises', {
      id_subject: subject.id_relation,
      id_class: classRoomid,
      suggestion: topSuggestions,
      listText: listText,
    });
  };

  React.useEffect(() => {
    console.log(postSuggestions);
  }, [postSuggestions]);

  return (
    <SuggestExercisesSectionContainer>
      <ListSuggestSection
        data={listSuggest}
        label={topSuggestions}
        setTopSuggestions={setTopSuggestions}
      />
      <ListPostContainer
        data={postSuggestions}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: any) => <ItemPostSuggest item={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </SuggestExercisesSectionContainer>
  );
};

//make this component available to the app
export default SuggestExercisesSection;
