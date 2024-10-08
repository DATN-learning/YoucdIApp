//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {QAndALearnScreenNavigationProps as QAndALearnNavigationProps} from '../../routes/NavigationProps';
import {useNavigation} from '@react-navigation/native';
import {IItemPostSectionProps} from './type';
import {useDispatch} from 'react-redux';
import {setIdPostEnable, setPostEnable} from '../../redux/questionPost/actions';
import { IPost } from '../../interfaces/Post';
import { useAuth } from '../../configs/AuthProvider';
const {width, height, fontScale, scale} = Dimensions.get('window');
// create a component
const ItemPostSectionContainer = styled.View`
  width: 100%;
  padding: 5px 10px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
`;

const ListImageContainer = styled.View``;
const Image = styled.Image`
  width: 100%;
  height: ${(props: {height: number; width: number}) =>props.height * (width / props.width)}px;
  border-radius:10px;
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

const MenuContainer = styled.View`
  width: 100%;
  padding: 10px;
  flex-direction: row;
`;

const MenuLeft = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;
const InfoRight = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const ReplyBtn = styled.TouchableOpacity`
  flex-direction: row;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 4px;
  border-color: #9e80f2;
`;
const LabelReply = styled(TextMyfont)`
  color: #9e80f2;
`;
const LabelReplyCount = styled(TextMyfont)`
  color: #000;
`;
const TimePost = styled(TextMyfont)`
  color: #000;
`;
const Avatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-left: 5px;
`;

const ItemPostSection: FC<IItemPostSectionProps> = props => {
  const {item} = props;
  const {isAuthenticated}=useAuth();
  const navigation = useNavigation<QAndALearnNavigationProps>();
  const dispatch = useDispatch();
  const [widthImage, setWidthImage] = React.useState<number>(200);
  const [heightImage, setHeightImage] = React.useState<number>(50);
  const handleReply = () => {
    if(!isAuthenticated){
      navigation.navigate('Authen');
      return;
    }
    dispatch(setPostEnable({} as IPost));
    dispatch(setIdPostEnable(item.id_post));
    navigation.navigate('DetailsPostScreen');
  };

  return (
    <ItemPostSectionContainer>
      <ListImageContainer>
        <Image
          source={{
            uri: item.images && item.images[0].url_image,
          }}
          resizeMode={'contain'}
          onLoad={e => {
            const {width, height} = e.nativeEvent.source;
            setWidthImage(width);
            setHeightImage(height);
          }}
          height={heightImage}
          width={widthImage}
        />
      </ListImageContainer>
      <InfoPostContainer onPress={handleReply}>
        <TitlePost numberLine={3}>{item.title && item.title}</TitlePost>
        <DescriptionPost numberLine={40}>
          {item.description && item.description}
        </DescriptionPost>
      </InfoPostContainer>
      <MenuContainer>
        <MenuLeft>
          <ReplyBtn onPress={handleReply}>
            <LabelReply>TRẢ LỜI</LabelReply>
          </ReplyBtn>
        </MenuLeft>
        <InfoRight>
          <TimePost>{item.timeAgo && item.timeAgo} </TimePost>
          <LabelReplyCount> 1 {'Trả lời'}</LabelReplyCount>
          <Avatar
            source={{
              uri: item.user_create.avatar && item.user_create.avatar,
            }}
          />
        </InfoRight>
      </MenuContainer>
    </ItemPostSectionContainer>
  );
};

//make this component available to the app
export default ItemPostSection;
