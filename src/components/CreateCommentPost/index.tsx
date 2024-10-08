import {TouchableOpacity, Text, Dimensions, Alert} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';
import {CreateCommentPostProps} from './type';
import TextMyfont from '../TextMyfont ';
import {AppColors} from '../../utils/constant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePickerN from 'react-native-image-picker';
import {createCommentPostApi} from '../../api/postApi';
import {useSelector} from 'react-redux';
import {getPostEnable} from '../../redux/questionPost/selectors';
import {useAuth} from '../../configs/AuthProvider';
import {useSocket} from '../../configs/SocketProvider';
const {width, height, fontScale, scale} = Dimensions.get('window');
const CreateCommentPostContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const ImagePostContainer = styled.View`
    width: 100%;
    height: ${(props: {height: number; width: number}) =>
      props.height * (width / props.width)}px;
    }px;
    background-color: #ccc;
    border-width: 1px;
`;
const ImagePost = styled.Image`
  width: 100%;
  height: 100%;
`;

const TimeContainer = styled.View`
  width: 100%;
  padding: 10px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;
const Time = styled(TextMyfont)`
  color: ${AppColors.purple};
  margin-left: 5px;
`;
const FormInput = styled.View`
  width: 100%;
  padding: 10px;
`;
const TitleInput = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: ${AppColors.purple};
  margin-bottom: 10px;
  padding: 10px;
  color: ${AppColors.purple};
  border-radius: 5px;
`;
const DescriptionInput = styled.TextInput`
  width: 100%;
  border-width: 1px;
  border-color: ${AppColors.purple};
  padding: 10px;
  color: ${AppColors.purple};
  border-radius: 5px;
  margin-bottom: 10px;
`;
const MenuContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}
interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: 'camera_unavailable' | 'permission' | 'others';
  errorMessage?: string;
  assets?: Asset[];
}
const CreateCommentPost: FC<CreateCommentPostProps> = props => {
  const {setVisible, urlImagePost} = props;
  const post = useSelector(getPostEnable);
  const idUser = useAuth().user.id;
  const {socket} = useSocket();
  const [secondsLeft, setSecondsLeft] = React.useState(900);
  const [heightImage, setHeightImage] = React.useState<number>(50);
  const [widthImage, setWidthImage] = React.useState<number>(200);
  const [heightImageCmt, setHeightImageCmt] = React.useState<number>(50);
  const [widthImageCmt, setWidthImageCmt] = React.useState<number>(200);
  const [title, setTitle] = React.useState<string>('');
  const [response, setResponse] = React.useState<ImagePickerResponse | null>(
    null,
  );
  const [description, setDescription] = React.useState<string>('');

  const lable =`+Đáp án giải đúng được nhiều lượt tương tác sẽ được sao ${'\n'}+Đáp án không phù hợp sẽ bị trừ sao và cảnh báo`
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        clearInterval(interval);
        setVisible(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const onButtonPress = React.useCallback(
    (
      type: string,
      options: ImagePickerN.CameraOptions | ImagePickerN.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        ImagePickerN.launchCamera(options, setResponse);
      } else {
        ImagePickerN.launchImageLibrary(options, setResponse);
      }
    },
    [],
  );
  const createCommentPost = async () => {
    try {
      // validate
      if (!title || !description || !response?.assets) {
        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
        return;
      }
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateCommentPost = `${day}${month}${year}`;
      const comment_id = `${'commet'}_${post.id}_${dateCommentPost}`;
      const data = {
        comment_id: comment_id,
        id_post: post.id.toString(),
        user_id: idUser.toString(),
        title_comment: title,
        description_comment: description,
        image_comment:
          response?.assets && response?.assets.length > 0
            ? response?.assets[0].uri?.toString()
            : '',
        typeImage: response?.assets && response?.assets[0].type,
      };
      console.log(data);
      const res = await createCommentPostApi(data);
      console.log(res);
      if (res.status === 200) {
        if (res.data.status) {
          Alert.alert('Thông báo', 'Bình luận thành công');
          socket.emit('create_comment', {
            datapost: res.data.data,
            id_post: post.id_post,
          });
          setVisible(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreateCommentPostContainer>
        <ImagePostContainer height={heightImage} width={widthImage}>
          <ImagePost
            source={{
              uri: urlImagePost,
            }}
            resizeMode={'contain'}
            onLoad={e => {
              const {width, height} = e.nativeEvent.source;
              setHeightImage(height);
              setWidthImage(width);
            }}
          />
        </ImagePostContainer>
        <TimeContainer>
          <FontAwesome5 name={'clock'} size={14} color={AppColors.purple} />
          <Time>
            {Math.floor(secondsLeft / 60)}:
            {secondsLeft % 60 < 10
              ? '0' + (secondsLeft % 60)
              : secondsLeft % 60}
          </Time>
        </TimeContainer>
        <FormInput>
          <TitleInput
            placeholder={'Tiêu đề'}
            placeholderTextColor={AppColors.purpleLight}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <DescriptionInput
            placeholder={lable}
            placeholderTextColor={AppColors.purpleLight}
            value={description}
            onChangeText={text => setDescription(text)}
            multiline={true}
            numberOfLines={10}
            textAlignVertical={'top'}
          />
          <MenuContainer>
            <TouchableOpacity
              onPress={() => {
                onButtonPress('library', {
                  selectionLimit: 0,
                  mediaType: 'photo',
                  includeBase64: false,
                });
              }}>
              <Feather name={'image'} size={30} color={AppColors.purple} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!title || !description}
              onPress={createCommentPost}>
              <Feather name={'send'} size={30} color={AppColors.purple} />
            </TouchableOpacity>
          </MenuContainer>
          {response?.assets && (
            <ImagePostContainer height={heightImageCmt} width={widthImageCmt}>
              <ImagePost
                source={{
                  uri: response.assets[0].uri,
                }}
                resizeMode={'contain'}
                onLoad={e => {
                  const {width, height} = e.nativeEvent.source;
                  setHeightImageCmt(height);
                  setWidthImageCmt(width);
                }}
              />
            </ImagePostContainer>
          )}
        </FormInput>
      </CreateCommentPostContainer>
    </>
  );
};

export default CreateCommentPost;
