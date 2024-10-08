//import liraries
import React, {FC} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {IListChapterSubjectSectionProps} from './type';
import styled from 'styled-components/native';
import ItemChapterSubject from './ItemChapterSubject';
import {getChapterSubjectList} from '../../api/subjectApi';
import {IChapter} from '../../interfaces/Subject';
import LottieView from 'lottie-react-native';
import {GIFJSON} from '../../utils/constant';
import TextMyfont from '../TextMyfont ';
// create a component
const ListChapterSubjectSectionContainer = styled.View`
  width: 100%;
  padding: 0px 0px 50px 0px;
`;
const LoadingContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LabelChapterSubject = styled(TextMyfont)`
  color: #000;
  align-self: center;
`;

const ListChapterSubjectSection: FC<
  IListChapterSubjectSectionProps
> = props => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [listChapter, setListChapter] = React.useState<IChapter[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    getListChapter();
  }, []);

  React.useEffect(() => {
    getListChapter();
  }, [props.subject_id]);

  const getListChapter = async () => {
    try {
      const res = await getChapterSubjectList(props.subject_id);
      if (res.data.status) {
        setListChapter(res.data.data.chapter);
        setIsLoading(false);
        setRefreshing(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ListChapterSubjectSectionContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading ? (
          <LoadingContainer>
            <LottieView
              source={GIFJSON.Loading}
              autoPlay
              loop
              speed={1.2}
              style={{width: 100, height: 100}}
            />
          </LoadingContainer>
        ) : listChapter.length <= 0 ? (
          <LabelChapterSubject>Không có dữ liệu</LabelChapterSubject>
        ) : (
          listChapter.map((item, index) => {
            return <ItemChapterSubject key={index} data={item} />;
          })
        )}
      </ScrollView>
    </ListChapterSubjectSectionContainer>
  );
};

//make this component available to the app
export default ListChapterSubjectSection;
