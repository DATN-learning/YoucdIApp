import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { getRatingByLessionChapterId } from '../../api/ratingApi';
import { IRatingLessiomProps } from './type';
import { IRatings } from '../../interfaces/Ratings';
import Icon, { Icons } from '../Icon';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RatingCard = styled.View`
  margin-bottom: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const RatingText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const FooterLoader = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const TextRating = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const StarContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;


const ListRatings: FC<IRatingLessiomProps> = ({ lessonChapterId }) => {
  const [ratings, setRatings] = useState<IRatings[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ListRatings = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await getRatingByLessionChapterId(lessonChapterId as number);

      if (response.status === 200 && Array.isArray(response.data.data)) {
        const newRatings = response.data.data;

        // Loại bỏ trùng lặp
        const uniqueRatings = newRatings.filter(newRating =>
          !ratings.some(existingRating => existingRating.rating_id === newRating.rating_id)
        );

        setRatings(prevRatings => [...prevRatings, ...uniqueRatings]);
        setHasMore(newRatings.length > 0); // Dừng nếu không còn dữ liệu
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [lessonChapterId, isLoading, hasMore, ratings]);

const renderItem = ({ item }: { item: IRatings }) => (
  item && (
    <RatingCard>
      <UserContainer>
        <UserAvatar source={{ uri: item.user_create.avatar || 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg' }} />
        <UserName>{item.user_create.first_name} {item.user_create.last_name}</UserName>
      </UserContainer>

      <RatingText>{item.content || 'Không có nội dung đánh giá'}</RatingText>

      <StarContainer>
        {Array.from({ length: 5 }, (_, index) => {
          const star = index + 1;
          return (
            <TouchableOpacity key={star}>
              <Icon
                name="star"
                size={20}
                color={star <= Number(item.rating) ? '#FFD700' : '#CCCCCC'}
                type={Icons.FontAwesome}
              />
            </TouchableOpacity>
          );
        })}
      </StarContainer>
    </RatingCard>
  )
);


  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    ListRatings();
  }, [ListRatings]);

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <FooterLoader>
        <ActivityIndicator size="small" color="#9e80f2" />
      </FooterLoader>
    );
  };

  return (
    <Container>
      <TextRating>Đánh giá</TextRating>
      <FlatList
        data={ratings}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};
export default ListRatings;