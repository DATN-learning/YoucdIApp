//import liraries
import React, {FC} from 'react';
import {ScrollView, Text, StyleSheet, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../routes/RootStack';
import {CreatePostScreenNavigationProps} from '../routes/NavigationProps';
import TextMyfont from '../components/TextMyfont ';
import {useSelector} from 'react-redux';
import {
  chooseClassRoom,
  chooseSubject,
  getSubjectClass,
} from '../redux/classRoom/selectors';
import {AppColors} from '../utils/constant';
import {useAuth} from '../configs/AuthProvider';
import {createPost} from '../api/postApi';

// create a component
const CreatePostViewContainer = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ImagePost = styled.Image`
  width: 100%;
  height: 20%;
`;
const Label = styled(TextMyfont)`
  color: #000;
`;
const FormContainer = styled.View`
  flex: 1;
  padding: 10px 20px;
`;
const TextInput = styled.TextInput`
  border: 1px solid ${AppColors.purple};
  border-radius: 10px;
  padding: 10px;
  color: ${AppColors.purple};
  margin: 10px 0px;
`;
const TitleTextInput = styled(TextInput)``;
const DescriptionTextInput = styled(TextInput)``;
const Button = styled.TouchableOpacity`
  background-color: ${AppColors.purple};
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin: 10px 0px;
`;
const ButtonLabel = styled(TextMyfont)`
  color: #fff;
`;
const NoteLabel = styled(TextMyfont)`
  color: ${AppColors.purple};
  margin: 10px 0px;
  padding: 0px 20px;
`;
const NoteDescriptionLabel = styled(TextMyfont)`
  color: ${AppColors.purple};
  margin: 10px 5px;
`;

const CreatePostContainer: FC = () => {
  const {user} = useAuth();
  const navigation = useNavigation<CreatePostScreenNavigationProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'CreatePostScreen'>>();
  const clasRoom = useSelector(chooseClassRoom);
  const idClassRoom = useSelector(getSubjectClass).listClass.find(
    item => item.class === clasRoom,
  )?.id;
  const subject = useSelector(chooseSubject);
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [listText, setListText] = React.useState<string[]>([]);
  React.useEffect(() => {
    const listTextBlock = route.params.blocResponse.blocks.map(item => {
      return item.text;
    });
    setListText(listTextBlock);
  }, [route.params.blocResponse]);

  const handleCreatePost = async () => {
    if (title.length === 0 || description.length === 0) {
      Alert.alert('Thông báo', 'Tiêu đề và mô tả không được để trống');
      return;
    }
    // get day
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const datePost = `${day}${month}${year}`;
    const idPost = `${'post-'}${datePost}${'-'}${clasRoom}${'-'}${
      subject.id_relation ? subject.id_relation : ''
    }${'-'}${user.id}`;
    try {
      const res = await createPost({
        id_post: idPost,
        user_id: Number(user.id),
        title: title,
        description: description,
        class_room_id: Number(idClassRoom),
        subject_id: Number(subject.id_relation),
        image_post: route.params.uriImage,
        list_text: listText,
        typeImage: route.params.typeImage,
        label: route.params.topSuggestions ? route.params.topSuggestions : '',
      });
      if (res.status === 200) {
        if (res.data.status) {
          Alert.alert('Thông báo', 'Tạo bài đăng thành công');
          navigation.navigate('LearnNavigation');
        } else {
          Alert.alert('Thông báo', 'Thử lại sau he');
          navigation.goBack();
        }
      } else {
        console.log(res.data.message);
        Alert.alert('Thông báo', res.data.message);
        navigation.navigate('LearnNavigation');
      }
    } catch (error) {
      console.log(error);
      navigation.navigate('LearnNavigation');
    }
  };

  return (
    <CreatePostViewContainer>
      <ImagePost
        source={{
          uri: route.params.uriImage,
        }}
        resizeMode="contain"
      />
      <Label>
        Lớp: {clasRoom} {subject.name ? 'Môn:' + subject.name : ''}
        {'Dạng Bài: ' + route.params.topSuggestions}
      </Label>
      <ScrollView style={{flex: 1}}>
        <FormContainer>
          <TitleTextInput
            placeholder="Tiêu đề"
            placeholderTextColor={AppColors.purple}
            value={title}
            onChangeText={setTitle}
          />
          <DescriptionTextInput
            placeholder="Mô tả"
            placeholderTextColor={AppColors.purple}
            multiline={true}
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />
          <Button onPress={handleCreatePost}>
            <ButtonLabel>Đăng bài</ButtonLabel>
          </Button>
        </FormContainer>

        <NoteLabel>Lưu ý :</NoteLabel>
        <NoteDescriptionLabel numberLine={6}>
          - Bài đăng không được chứa nội dung nhạy cảm, không được chứa các từ
          ngữ xúc phạm, không được chứa các từ ngữ không phù hợp với môi trường
          học tập.
        </NoteDescriptionLabel>
        <NoteDescriptionLabel numberLine={6}>
          - Hình ảnh không được chứa các hình ảnh nhạy cảm, không được chứa các
          hình ảnh không phù hợp với môi trường học tập.
        </NoteDescriptionLabel>
        <NoteDescriptionLabel numberLine={6}>
          - Vi Phạm sẽ bị xóa bài đăng và bị khóa tài khoản.
        </NoteDescriptionLabel>
      </ScrollView>
    </CreatePostViewContainer>
  );
};

//make this component available to the app
export default CreatePostContainer;
