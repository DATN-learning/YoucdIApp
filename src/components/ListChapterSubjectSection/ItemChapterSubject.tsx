//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {List} from 'react-native-paper';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {ChapterSubjectScreenNavigationProps as ChapterSubjectNavigationProps} from '../../screens/LearnSpace/ChapterSubjectScreen';
import {useNavigation} from '@react-navigation/native';
import {IChapter} from '../../interfaces/Subject';
const {width, height} = Dimensions.get('window');
// create a component
const ItemChapterSubjectContainer = styled.View`
  width: ${width}px;
  margin: 10px 0px;
  padding: 0px 20px;
`;
const ItemChapterSubjectContent = styled.View`
  width: 100%;
  border-radius: 10px;
`;
const ImageChapterSubjectContainer = styled.ImageBackground`
  width: 100%;
  height: 120px;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const LabelChapterSubject = styled(TextMyfont)`
  margin: 10px;
  font-size: 16px;
  color: #fff;
`;
const ContentChapterSubjectContainer = styled.View`
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-width: 1px;
  border-top-color: #ccc;
  background-color: #9e80f2;
  padding-bottom: 10px;
`;
const SumLessonChapterSubject = styled(TextMyfont)`
  font-size: 14px;
  color: #fff;
`;
interface ItemChapterSubjectProps {
  data: IChapter;
}

const ItemChapterSubject: FC<ItemChapterSubjectProps> = props => {
  const {data} = props;
  const navigation = useNavigation<ChapterSubjectNavigationProps>();
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  const handlePressLesson = (
    idSubject: Number,
    idChapter: Number,
    idLession: Number,
    numberChapter: Number,
    nameLession: String,
  ) => {
    navigation.navigate('LessionChapterScreen', {
      idSubject: idSubject.toString(),
      idChapter: idChapter.toString(),
      idLession: idLession.toString(),
      numberChapter: numberChapter.toString(),
      nameLession: nameLession.toString(),
    });
  };

  const renderLession = () =>
    React.useMemo(() => {
      return data.lessions.map((item, index) => (
        <List.Item
          key={index}
          titleStyle={{
            fontFamily: 'VarelaRound-Regular',
            color: '#fff',
          }}
          title={item.name_lesstion_chapter+(' ')+item.description_lesstion_chapter}
          style={{
            borderBottomColor: '#fff',
            borderBottomWidth: 0.5,
          }}
          onPress={() => {
            handlePressLesson(data.subject_id, data.id, item.id,data.number_chapter,item.name_lesstion_chapter);
          }}
          left={props => <List.Icon {...props} icon="book-open" color="#fff" />}
        />
      ));
    }, [data.lessions]);

  return (
    <ItemChapterSubjectContainer>
      <ItemChapterSubjectContent
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <ImageChapterSubjectContainer
          source={{
            uri: data.chapter_image,
          }}>
          <LabelChapterSubject numberLine={2}>
            {data.name_chapter_subject}
          </LabelChapterSubject>
        </ImageChapterSubjectContainer>
        <ContentChapterSubjectContainer>
          <List.Section>
            <List.Accordion
              title={data.name_chapter_subject}
              titleStyle={{
                fontFamily: 'VarelaRound-Regular',
                color: '#fff',
              }}
              expanded={expanded}
              onPress={handlePress}
              style={{backgroundColor: '#9e80f2'}}
              right={props =>
                data.lessions.length > 0 && (
                  <List.Icon
                    {...props}
                    icon={expanded ? 'chevron-up' : 'chevron-down'}
                    color="#fff"
                  />
                )
              }
              left={props => (
                <List.Icon {...props} icon="folder" color="#fff" />
              )}>
              {renderLession()}
            </List.Accordion>
          </List.Section>
          <SumLessonChapterSubject>
            {' '}
            {data.lessions.length.toString()} {'Bài Học'}
          </SumLessonChapterSubject>
        </ContentChapterSubjectContainer>
      </ItemChapterSubjectContent>
    </ItemChapterSubjectContainer>
  );
};

//make this component available to the app
export default ItemChapterSubject;
