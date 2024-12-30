import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon, { Icons } from '../Icon';
import { addRating } from '../../api/ratingApi';
import { useAuth } from '../../configs/AuthProvider';
import { IRatingLessiomProps } from './type';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StarContainer = styled.View`
  flex-direction: row;
  margin-vertical: 10px;
`;

const InputContainer = styled.TextInput`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  text-align-vertical: top;
`;

const ButtonContainer = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #9e80f2;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const RatingContainer = styled.TouchableOpacity`
  margin-top: 20px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 8px;
`;

const TextRating = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

const Ratings: FC<IRatingLessiomProps> = ({lessonChapterId}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const user_id = user.id;
  const lesson_chapter_id = lessonChapterId;
  const ratingid = "0";

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn số sao.');
      return;
    }

    if (!reviewText.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung đánh giá.');
      return;
    }

    setLoading(true);
    try {
      const response = await addRating(ratingid,user_id, lesson_chapter_id as number, reviewText, rating.toString());
      console.log('Response:', response.data.data);
      setRating(0);
      setReviewText(''); 
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <RatingContainer>
      <TextRating>Đánh giá của bạn</TextRating>
      </RatingContainer>
      <StarContainer>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Icon
              name="star"
              size={40}
              color={star <= rating ? '#FFD700' : '#CCCCCC'}
              type={Icons.FontAwesome} 
            />
          </TouchableOpacity>
        ))}
      </StarContainer>

      <InputContainer
        placeholder="Viết đánh giá của bạn..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />

      <ButtonContainer onPress={handleSubmit} disabled={loading}>
        <ButtonText>{loading ? 'Đang gửi...' : 'Gửi đánh giá'}</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Ratings;
