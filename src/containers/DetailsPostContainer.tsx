//import liraries
import React, {FC} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import DetailsPost from '../components/DetailsPost';
import AnswerPosts from '../components/AnswerPosts';
import {useDispatch, useSelector} from 'react-redux';
import {getIdPostEnable} from './../redux/questionPost/selectors';
import {setPostEnable} from '../redux/questionPost/actions';
import {getQuestionPostByID} from '../redux/questionPost/api';
import {ICommentPostPagination, IPost} from '../interfaces/Post';
import {getPostEnable as getPostEnableSLT} from '../redux/questionPost/selectors';
import LableLoading from '../components/LableLoading';
import {QAndALearnScreenNavigationProps as QAndALearnNavigationProps} from '../routes/NavigationProps';
import {ActivityIndicator} from 'react-native-paper';
import {AppColors} from '../utils/constant';
import {getCommentByPost} from '../api/postApi';
import {useNavigation} from '@react-navigation/native';
import {useSocket} from '../configs/SocketProvider';
// create a component
const DetailsPostViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;
const DetailsPostFlatList = styled.FlatList`
  flex: 1;
`;
const LoadingContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;


const DetailsPostContainer: FC = () => {
  const navigation = useNavigation<QAndALearnNavigationProps>();
  const idPostEnabel = useSelector(getIdPostEnable);
  const post = useSelector(getPostEnableSLT);
  const {socket} = useSocket();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(true);
  const [listComment, setListComment] = React.useState<
    ICommentPostPagination[]
  >([]);
  const [isEmty, setIsEmty] = React.useState(false);
  const [isEmptyComment, setIsEmptyComment] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setListComment([]);
    setRefreshing(true);
    getPostEnable(idPostEnabel);
    getComment(idPostEnabel, 10, 1);
  }, []);
  React.useEffect(() => {
    setListComment([]);
    idPostEnabel != ''
      ? (getPostEnable(idPostEnabel), getComment(idPostEnabel, 10, 1))
      : null;
    return () => {
      socket.emit('leave_post', {
        postID: idPostEnabel,
      });
    };
  }, [idPostEnabel]);

  const getPostEnable = async (idPostEnabel: string) => {
    try {
      const res = await getQuestionPostByID(idPostEnabel);
      if (res.status === 200) {
        if (res.data.status) {
          setRefreshing(false);
          dispatch(setPostEnable(res.data.data));
          res.data.data && res.data.data.id ? null : navigation.goBack();
          res.data.data &&
            res.data.data.id &&
            socket.emit('open_post', {
              postID: res.data.data.id_post,
            });
        } else {
          setIsEmty(true);
          setRefreshing(false);
          dispatch(setPostEnable({} as IPost));
          navigation.goBack();
        }
      }
    } catch (error) {}
  };

  const getComment = async (
    idPostEnabel: string,
    limit: number,
    page: number,
  ) => {
    try {
      const res = await getCommentByPost({
        id_post: idPostEnabel,
        limit: limit,
        page: page,
      });
      if (res.status === 200) {
        if (res.data.status) {
          setListComment(listComment => [
            ...listComment,
            ...res.data.data.data.reverse(),
          ]);
          setIsEmptyComment(
            listComment.length <= 0 && res.data.data.data.length <= 0
              ? true
              : false,
          );
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    socket.on('create_comment', (data: any) => {
      console.log(data);
      setListComment([data.datapost, ...listComment]);
    });

    return () => {
      socket.off('create_comment');
    };
  }, [socket, listComment]);

  return (
    <DetailsPostViewContainer>
      {post.id && (
        <DetailsPostFlatList
          ListHeaderComponent={<DetailsPost />}
          data={listComment}
          renderItem={({item}: any) => <AnswerPosts item={item} />}
          ListFooterComponent={
            <View
              style={{
                height: 100,
              }}
            />
          }
          keyExtractor={(item, index): any => index.toString()}
          // when empty item
          ListEmptyComponent={
            <>
              {isEmptyComment ? (
                <LoadingContainer>
                  <LableLoading text="Chưa có câu trả lời nào " />
                </LoadingContainer>
              ) : (
                <LoadingContainer>
                  <ActivityIndicator size="small" color={AppColors.purple} />
                </LoadingContainer>
              )}
            </>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {!refreshing && isEmty ? (
        <LableLoading text="Có Lỗi Xảy Ra Ở Đây" />
      ) : (
        <LableLoading text="Loading..." />
      )}
    </DetailsPostViewContainer>
  );
};

//make this component available to the app
export default DetailsPostContainer;
