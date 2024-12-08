import React from 'react';
import {Text, View, StyleSheet, RefreshControl, Alert, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import ItemPostSection from '../components/ItemPostSection';
import {useDispatch, useSelector} from 'react-redux';
import {
  chooseClassRoom as chooseClassRoomSLT,
  chooseSubject as chooseSubjectSLT,
  getSubjectClass,
} from '../redux/classRoom/selectors';
import {getPostByClassAndSub} from '../api/postApi';
import {IPostPagination} from '../interfaces/Post';
import {AppColors} from '../utils/constant';
import TextMyfont from '../components/TextMyfont ';
import { chooseClassRoom, chooseSubject } from '../redux/classRoom/actions';

const QAndAViewContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const ListPostUIFL = styled.FlatList``;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
  margin-bottom: 100px;
`;

const PaginationButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: ${AppColors.purpleLight};
`;

const PaginationText = styled(TextMyfont)`
  color: white;
  font-weight: bold;
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalPosts, setTotalPosts] = React.useState(0);

  React.useEffect(() => {
    getListPost(1);
  }, [classRoom, subject]);

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
    getListPost(1);
  }, []);

  const getListPost = async (page: number) => {
    setRefreshing(true);

    try {
      const res = await getPostByClassAndSub({
        classRoom: Number(idClassRoom),
        subject:
          subject.id_relation && subject.id_relation > -1
            ? Number(subject.id_relation)
            : null,
        per_page: 10,
        page: page,
      });

      if (res.status === 200 && res.data.status) {
        const fetchedPosts = res.data.data.data;
        const total = res.data.data.total;
        console.log("Tổng số trang", total);

        setListPost(fetchedPosts);
        setTotalPosts(total);
        setTotalPages(Math.ceil(total / 10));
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      getListPost(page);
      setCurrentPage(page); 
    }
  };

  return (
    <QAndAViewContainer>
      {refreshing && listPost.length === 0 ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : listPost.length === 0 ? (
        <Text>Không có dữ liệu</Text>
      ) : (
        <>
          <ListPostUIFL
            data={listPost}
            renderItem={({item}: any) => <ItemPostSection item={item} />}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={
              totalPosts > 10 ? (
                <PaginationContainer>
                  <PaginationButton
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: currentPage === 1 ? 'gray' : AppColors.purpleLight,
                    }}>
                    <PaginationText>{'<< Trước'}</PaginationText>
                  </PaginationButton>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <PaginationButton
                        key={page}
                        onPress={() => handlePageChange(page)}
                        style={{
                          backgroundColor:
                            currentPage === page ? AppColors.purple : AppColors.purpleLight,
                        }}>
                        <PaginationText>{page}</PaginationText>
                      </PaginationButton>
                    );
                  })}

                  <PaginationButton
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor:
                        currentPage === totalPages ? 'gray' : AppColors.purpleLight,
                    }}>
                    <PaginationText>{'Tiếp >>'}</PaginationText>
                  </PaginationButton>
                </PaginationContainer>
              ) : null
            }
          />
        </>
      )}
    </QAndAViewContainer>
  );
};

export default QAndAContainer;
