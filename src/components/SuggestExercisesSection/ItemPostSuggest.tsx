import {View, Text, Dimensions} from 'react-native';
import React, {FC} from 'react';
import {IItemPostSuggestProps} from './type';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {setIdPostEnable} from '../../redux/questionPost/actions';
import {useNavigation} from '@react-navigation/native';
import {AnalyzeExercisesScreenNavigationProps} from '../../routes/NavigationProps';

const ItemPostSuggestContainer = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width - 20}px;
  background-color: #ccc;
  height: 100%;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ItemPostSuggest: FC<IItemPostSuggestProps> = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AnalyzeExercisesScreenNavigationProps>();

  const navigateToDetail = () => {
    dispatch(setIdPostEnable(props.item.id_post));
    navigation.navigate('DetailsPostScreen');
  };

  return (
    <>
      <ItemPostSuggestContainer onPress={navigateToDetail}>
        <Image
          source={{uri: props.item.images[0].url_image}}
          resizeMode="contain"
        />
      </ItemPostSuggestContainer>
    </>
  );
};

export default ItemPostSuggest;
