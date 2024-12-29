import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { getUserLastLesson } from '../../api/viewApi';
import { useAuth } from '../../configs/AuthProvider';
import { ChapterSubjectScreenNavigationProps as ChapterSubjectNavigationProps } from '../../screens/LearnSpace/ChapterSubjectScreen';
import { useNavigation } from '@react-navigation/native';
import { IChapterLessonData } from '../../interfaces/Subject';
import TextMyfont from '../TextMyfont ';
import { getlesson_by_rating } from '../../api/ratingApi';

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

const LoadingContainer = styled(View)`
  padding: 20px;
  align-items: center;
`;

const RetryButton = styled(Pressable)`
  width: 150px;
  height: 100px;
  background-color: white;
  border-radius: 5px;
`;

const RetryText = styled(Text)`
  color: white;
  font-size: 14px;
`;

const ErrorContainer = styled(View)`
  padding: 20px;
  align-items: center;
`;

const ProposeSection: FC = () => {
  const navigation = useNavigation<ChapterSubjectNavigationProps>();
  const [lessons, setLessons] = useState<IChapterLessonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

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

  const LastLessons = React.useCallback(async (forced = false) => {
    if (!isAuthenticated || !user?.id) {
      setError('Vui lòng đăng nhập để xem bài học đề xuất');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getlesson_by_rating(user.id);
      console.log('API Response:', response.data.data.recommendations);

      if (response?.status) {
        setLessons(response.data.data.recommendations || []);
      } 
    } catch (err) {
      setError('Không thể lấy ra bài học. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      LastLessons();
    }
  }, [isAuthenticated, user?.id]);

  const handleRetry = () => {
    LastLessons(true);
  };

  if (!isAuthenticated || !user?.id) {
    return (
      <Container>
        <Title>Đề xuất bài học</Title>
        <ErrorContainer>
          <Text>Vui lòng đăng nhập để xem bài học đề xuất</Text>
        </ErrorContainer>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Title>Đề xuất bài học</Title>
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0066cc" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Đề xuất bài học</Title>
        <ErrorContainer>
          <RetryButton onPress={handleRetry}>
            <RetryText>Thử lại</RetryText>
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Đề xuất bài học</Title>
      {lessons.length === 0 ? (
        <Text style={{ textAlign: 'center', padding: 20 }}>
          Chưa có bài học đề xuất
        </Text>
      ) : (
        <LessonContainer horizontal showsHorizontalScrollIndicator={false}>
          {lessons.map(({ chapter, lesson }, index) => (
            <LessonCard
              key={`${chapter.id}-${index}`}
              onPress={() =>
                handlePressLesson(
                  chapter.subject_id,
                  chapter.id,
                  lesson.id,
                  chapter.number_chapter,
                  lesson.name_lesstion_chapter
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
                  {lesson.name_lesstion_chapter}
                </LessonTitle>
                <LessonDescription numberOfLines={1} ellipsizeMode="tail">
                  {lesson.description_lesstion_chapter}
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