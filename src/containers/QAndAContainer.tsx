//import liraries
import React, {FC} from 'react';
import {ScrollView, Text, StyleSheet, View, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import ItemPostSection from '../components/ItemPostSection';
import {useDispatch, useSelector} from 'react-redux';
import {
  chooseClassRoom as chooseClassRoomSLT,
  chooseSubject as chooseSubjectSLT,
  getSubjectClass,
} from '../redux/classRoom/selectors';
import {getPostByClassAndSub} from '../api/postApi';
import {IPost, IPostPagination} from '../interfaces/Post';
import {Alert} from 'react-native';
import TextMyfont from '../components/TextMyfont ';
import {AppColors} from '../utils/constant';
import {chooseClassRoom, chooseSubject} from '../redux/classRoom/actions';
// create a component
const QAndAViewContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;
const ListPostUIFL = styled.FlatList``;
const Label = styled(TextMyfont)`
  color: ${AppColors.purpleLight};
  align-self: center;
`;
const QAndAContainer = () => {
  const classRoom = useSelector(chooseClassRoomSLT);
  const idClassRoom = useSelector(getSubjectClass).listClass.find(
    item => item.class === classRoom,
  )?.id;
  const subject = useSelector(chooseSubjectSLT);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [listPost, setListPost] = React.useState<IPostPagination[]>([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(
      chooseClassRoom(classRoom)
    )
    dispatch(
      chooseSubject({
        id: '',
        name: 'Tất Cả',
        id_relation: 0,
      }),
    );
    getListPost();
  }, []);
  React.useEffect(() => {
    getListPost();
  }, [classRoom, subject]);

  const getListPost = async () => {
    setRefreshing(true);
    try {
      const res = await getPostByClassAndSub({
        classRoom: Number(idClassRoom),
        subject:
          subject.id_relation && subject.id_relation > -1
            ? Number(subject.id_relation)
            : null,
        per_page: 10,
        page: 1,
      });
      if (res.status === 200) {
        setListPost([]);
        setRefreshing(false);
        if (res.data.status) {
          setRefreshing(false);
          setListPost(res.data.data.data);
        } else {
          setRefreshing(false);
          Alert.alert('Thông báo', res.data.message);
        }
      }
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };
  return (
    <QAndAViewContainer>
      {refreshing && listPost.length === 0 ? (
        <Label>Đang tải dữ liệu ...</Label>
      ) : listPost.length == 0 ? (
        <Label>
          <Label>Không có dữ liệu</Label>
        </Label>
      ) : (
        <ListPostUIFL
          data={listPost}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}: any) => <ItemPostSection item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <View
              style={{
                height: 100,
              }}
            />
          }
        />
      )}
    </QAndAViewContainer>
  );
};

//make this component available to the app
export default QAndAContainer;
