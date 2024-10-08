import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {HomeLearnScreenNavigationProps as HomeLearnNavigationProps} from '../../screens/LearnSpace/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import stylesTM from '../../themes/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../configs/AuthProvider';
const {width, height} = Dimensions.get('window');

const MenuCameraContainer = styled.View`
  width: ${(props: {isPortrait: boolean}) =>  props.isPortrait ? width : height}px;
  height: 100%;
  padding: 0px 20px;
`;
const Label = styled.Text`
  font-size: 30px;
  color: #000;
`;
const CameraContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const CameraSection = styled.View`
  width: 70%;
  background-color: #bba7f1;
  padding: 10px;
  border-radius: 10px;
`;
const Camera = styled.TouchableOpacity`
  width: 100%;
  background-color: #9e80f2;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
`;
const LabelCamera = styled.Text`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #fff;
`;
const MenuCamera = () => {
  const {orientation}=useAuth();
  const navigation = useNavigation<HomeLearnNavigationProps>();
  const handlePress = () => navigation.navigate('TakePhotoScreen');
  

  return (
    <MenuCameraContainer
      isPortrait={orientation === 'portrait' ? true : false}
    >
      <Label numberOfLines={2} style={[stylesTM.fontVR]}>
        Hôm Nay{'\n'}Bạn Muốn Học Gì ?
      </Label>
      <CameraContainer>
        <CameraSection>
          <Camera onPress={handlePress}>
            <Ionicons name="camera" size={30} color="#fff" />
            <LabelCamera style={stylesTM.fontVR}>Chụp Ảnh Bài Tập</LabelCamera>
          </Camera>
        </CameraSection>
      </CameraContainer>
    </MenuCameraContainer>
  );
};

export default MenuCamera;
