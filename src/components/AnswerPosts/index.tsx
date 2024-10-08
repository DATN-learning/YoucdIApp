//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import stylesTM from '../../themes/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {AppColors} from '../../utils/constant';
import {IItemCommenProps} from './type';
const {width, height, fontScale, scale} = Dimensions.get('window');
// create a component
const AnswerPostsContainer = styled.View`
  margin-top: 10px;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e6e6;
`;
const HeaderAnswer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const InFoUser = styled.View`
  margin-left: 10px;
  justify-content: space-between;
`;
const NameAndTime = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const NameUser = styled(TextMyfont)`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;
const TimeComment = styled(TextMyfont)`
  color: #000;
`;
const LevelAndPoint = styled.View``;
const LevelUser = styled(TextMyfont)`
  color: ${AppColors.purple};
`;
const BodyAnswer = styled.View``;
const TitleAnswer = styled(TextMyfont)`
  color: #000;
`;
const DescriptionAnswer = styled(TextMyfont)`
  color: #000;
`;
const BottomMenu = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 10px;
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
const Numlike = styled(FontSize)`
  color: #ffb4b4;
`;
const NumComment = styled(FontSize)`
  color: #95bdff;
  margin-left: 5px;
`;
const ImagePostContainer = styled.View`
    width: 100%;
    height: ${(props: {height: number; width: number}) =>
      props.height * (width / props.width)}px;
    }px;
    background-color: #fff;
    border-width: 1px;
`;
const ImagePost = styled.Image`
  width: 100%;
  height: 100%;
`;
const AnswerPosts: FC<IItemCommenProps> = props => {
  const {item} = props;
  const [heightImageCmt, setHeightImageCmt] = React.useState<number>(50);
  const [widthImageCmt, setWidthImageCmt] = React.useState<number>(200);
  return (
    <AnswerPostsContainer>
      <HeaderAnswer>
        <Avatar
          source={{
            uri: item.user_create.avatar ? item.user_create.avatar : '',
          }}
        />
        <InFoUser>
          <NameAndTime>
            <NameUser>
              {item.user_create.first_name} {item.user_create.last_name}
            </NameUser>
            <TimeComment> {item.timeAgo}</TimeComment>
          </NameAndTime>
          <LevelAndPoint>
            <LevelUser>Level 1 Sói con hung hăng</LevelUser>
          </LevelAndPoint>
        </InFoUser>
      </HeaderAnswer>
      <BodyAnswer>
        <TitleAnswer numberLine={10}>{item.title}</TitleAnswer>
        <DescriptionAnswer numberLine={40}>
          {item.body.length > 100
            ? item.body.substring(0, 100) + '... '
            : item.body}
          {item.body.length > 100 && (
            <Text
              style={{color: AppColors.purple}}
              onPress={() => {
                console.log('click');
              }}>
              Xem thêm
            </Text>
          )}
        </DescriptionAnswer>
        {item.images && item.images.length > 0 && (
          <ImagePostContainer height={heightImageCmt} width={widthImageCmt}>
            <ImagePost
              source={{
                uri:
                  item.images && item.images.length > 0
                    ? item.images[0].url_image
                    : '',
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
      </BodyAnswer>
      <BottomMenu>
        <ContainerMenu>
          <BtnSelect onPress={() => {}}>
            <AntDesign name="heart" size={20} color="#FFB4B4" />
            <Numlike> 10</Numlike>
          </BtnSelect>
        </ContainerMenu>
        <View style={{width: 10}} />
        <ContainerMenu>
          <BtnSelect onPress={() => {}}>
            <Octicons name="comment" size={20} color="#95BDFF" />
            <NumComment>10</NumComment>
          </BtnSelect>
        </ContainerMenu>
      </BottomMenu>
    </AnswerPostsContainer>
  );
};

//make this component available to the app
export default AnswerPosts;
