import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, View, Image, Pressable } from 'react-native';
import { getUserLastLesson } from '../../api/viewApi';
import { useAuth } from '../../configs/AuthProvider';
import {ChapterSubjectScreenNavigationProps as ChapterSubjectNavigationProps} from '../../screens/LearnSpace/ChapterSubjectScreen';
import { useNavigation } from '@react-navigation/native';
import { IChapter, IChapterLessonData, IChapters } from '../../interfaces/Subject';
import TextMyfont from '../TextMyfont ';

const Container = styled(View)`
  flex: 1;
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 20px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
`;

const LessonContainer = styled(ScrollView)`
  flex-direction: row;
`;

const LessonCard = styled(Pressable)`
  width: 150px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-right: 10px;
  overflow: hidden;
  elevation: 3;
`;

const LessonInfo = styled(View)`
  padding: 5px;
`;

const LessonTitle = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const LessonDescription = styled(Text)`
  font-size: 12px;
  color: #555;
`;

const ImageChapterSubjectContainer = styled.ImageBackground`
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const LabelChapterSubject = styled(TextMyfont)`
  margin: 10px;
  font-size: 12px;
  color: black;
`;

const ProposeSection = () => {
  const navigation = useNavigation<ChapterSubjectNavigationProps>();
  const [lessons, setLessons] = useState<IChapterLessonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePressLesson = (
    idSubject: number,
    idChapter: number,
    idLession: number,
    numberChapter: number,
    nameLession: string | undefined
  ) => {
    navigation.navigate('LessionChapterScreen', {
      idSubject: idSubject?.toString() || '',
      idChapter: idChapter?.toString() || '',
      idLession: idLession?.toString() || '',
      numberChapter: numberChapter?.toString() || '',
      nameLession: nameLession || 'Untitled Lesson',
    });
  };

  const LastLessons = React.useCallback(async () => {
    if (!user || !user.id) {
      console.log('User not authenticated or id not available');
      setError('User not authenticated');
      return;
    }
    try {
      const response = await getUserLastLesson(user.id);

      if (response.status) {
        console.log('API response data:', response.data);
        setLessons(response.data.data);
        setError(null);
      } else {
        setError('Failed to fetch lessons');
      }
    } catch (err) {
      console.error(err);
      setError('Không thể lấy ra bài học');
    }
  }, [user?.id]);

  useEffect(() => {
    if (user && user.id) {
      LastLessons();
    }
  }, [user?.id]);

  return (
    <Container>
      <Title>Đề xuất bài học</Title>
      {error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <LessonContainer horizontal showsHorizontalScrollIndicator={false}>
          {lessons.map(({ chapter, next_lesson }, index) => (
            <LessonCard
              key={`${chapter.id}-${index}`}
              onPress={() =>
                handlePressLesson(
                  chapter.subject_id,
                  chapter.id,
                  next_lesson.id,
                  chapter.number_chapter,
                  next_lesson.name_lesstion_chapter
                )
              }
            >
              <ImageChapterSubjectContainer
                source={{
                  uri: chapter.chapter_image,
                }}>
                <LabelChapterSubject numberLine={2}>
                  {chapter.name_chapter_subject}
                </LabelChapterSubject>
              </ImageChapterSubjectContainer>
              <LessonInfo>
                <LessonTitle numberOfLines={2} ellipsizeMode="tail">
                  {next_lesson.name_lesstion_chapter}
                </LessonTitle>
                <LessonDescription numberOfLines={1} ellipsizeMode="tail">
                  {next_lesson.description_lesstion_chapter}
                </LessonDescription>
              </LessonInfo>
            </LessonCard>
          ))}
        </LessonContainer>
      )}
    </Container>
  );
};

export default ProposeSection;
