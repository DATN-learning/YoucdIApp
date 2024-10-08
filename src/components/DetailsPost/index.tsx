//import liraries
import React, {FC} from 'react';
import {View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {DetailsPostProps} from './type';
import HeaderPost from './HeaderPost';
import TextMyfont from '../TextMyfont ';
import stylesTM from '../../themes/styles';
import {AppColors} from '../../utils/constant';
import {useSelector} from 'react-redux';
import {getPostEnable} from '../../redux/questionPost/selectors';
import BottomPopup from '../BottomPopUp';
import CreateCommentPost from '../CreateCommentPost';
// create a component
const {width, height, fontScale, scale} = Dimensions.get('window');
const DetailsPostContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #e8e6e6;
`;
const ImagePostContainer = styled.View`
  width: 100%;
  height: ${(props: {height: number; width: number}) =>
    props.height * (width / props.width)}px;
}px;
  background-color: #ccc;
`;
const ImagePost = styled.Image`
  width: 100%;
  height: 100%;
`;
const InfoPostContainer = styled.TouchableOpacity`
  padding: 10px;
`;

const TitlePost = styled(TextMyfont)`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;
const DescriptionPost = styled(TextMyfont)`
  font-size: 14px;
  color: #000;
`;

const MenuPostContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
`;
const ContainerMenu = styled.View`
  padding: 8px 20px;
  border-radius: 13px;
  border-width: 2px;
  border-color: #e8e6e6;
  flex-direction: row;
  justify-content: space-between;
`;
const FontSize = styled.Text`
  font-size: 14px;
`;
const BtnSelect = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const NameClass = styled(FontSize)`
  color: ${AppColors.purple};
`;

const DetailsPost: FC<DetailsPostProps> = () => {
  const post = useSelector(getPostEnable);
  const [widthImage, setWidthImage] = React.useState<number>(200);
  const [heightImage, setHeightImage] = React.useState<number>(50);
  const [isShowPopUpComment, setIsShowPopUpComment] =
    React.useState<boolean>(false);
  return (
    <DetailsPostContainer>
      <HeaderPost />
      <ImagePostContainer height={heightImage} width={widthImage}>
        <ImagePost
          source={{
            uri: post?.images[0].url_image || 'https://picsum.photos/200/300',
          }}
          resizeMode={'contain'}
          onLoad={e => {
            const {width, height} = e.nativeEvent.source;
            setWidthImage(width);
            setHeightImage(height);
          }}
        />
      </ImagePostContainer>
      <InfoPostContainer>
        <TitlePost numberLine={3}>{post.title && post.title}</TitlePost>
        <DescriptionPost numberLine={40}>
          {post.description && post.description}
        </DescriptionPost>
      </InfoPostContainer>
      <MenuPostContainer>
        <ContainerMenu>
          <BtnSelect onPress={() => {}}>
            <NameClass style={[stylesTM.fontVR]}>
              {post?.classNumber && post?.classNumber
                ? post?.classNumber
                : 'Chưa có lớp'}
            </NameClass>
          </BtnSelect>
        </ContainerMenu>
        <View style={{width: 10}} />
        <ContainerMenu>
          <BtnSelect onPress={() => {}}>
            <NameClass style={[stylesTM.fontVR]}>
              {post?.subjectName && post?.subjectName
                ? post?.subjectName
                : 'Chưa có môn'}
            </NameClass>
          </BtnSelect>
        </ContainerMenu>
        <View style={{width: 10}} />
        <ContainerMenu>
          <BtnSelect
            onPress={() => {
              setIsShowPopUpComment(true);
            }}>
            <NameClass style={[stylesTM.fontVR]}>Trả lời</NameClass>
          </BtnSelect>
        </ContainerMenu>
      </MenuPostContainer>
      <BottomPopup
        visible={isShowPopUpComment}
        setVisible={setIsShowPopUpComment}
        children={<CreateCommentPost
        urlImagePost={post?.images[0].url_image}
          setVisible={setIsShowPopUpComment}
        />}
        animationType="fade"
        maxHeight='80%'
        title='Trả lời bài viết'
        titleStyle={{fontSize: 10, fontWeight: 'bold',color:'black'}}
      />
    </DetailsPostContainer>
  );
};

//make this component available to the app
export default DetailsPost;
