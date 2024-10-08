//import liraries
import React, {FC} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {HeaderDetailsPostProps} from './type';
import styled from 'styled-components/native';
import TextMyfont from '../TextMyfont ';
import {useSelector} from 'react-redux';
import {getPostEnable} from '../../redux/questionPost/selectors';
// create a component
const HeaderPostContainer = styled.View`
  width: 100%;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const InfoUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const InfoUser = styled.View`
  margin-left: 10px;
`;
const NameUser = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;
const TimePost = styled(TextMyfont)`
  color: #000;
`;
const MenuContainer = styled.View`
  flex-direction: row;
`;
const BtnMenu = styled.TouchableOpacity``;

const HeaderPost: FC<HeaderDetailsPostProps> = () => {
  const post = useSelector(getPostEnable);
  return (
    <HeaderPostContainer>
      <InfoUserContainer>
        <Avatar
          source={{
            uri: post?.user_create?.avatar && post?.user_create?.avatar,
          }}
        />
        <InfoUser>
          <NameUser>
            {post?.user_create?.first_name && post?.user_create?.first_name}{' '}
            {post?.user_create?.last_name && post?.user_create?.last_name}
          </NameUser>
          <TimePost>{post.timeAgo && post.timeAgo}</TimePost>
        </InfoUser>
      </InfoUserContainer>
      <MenuContainer>
        <BtnMenu>
          <Entypo name="dots-three-vertical" size={20} color="#000" />
        </BtnMenu>
      </MenuContainer>
    </HeaderPostContainer>
  );
};

//make this component available to the app
export default HeaderPost;
