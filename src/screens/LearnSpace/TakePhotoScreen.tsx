import React, {FC} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePickerN from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {Alert, NativeModules} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes/RootStack';
import {recognizeImage, Response} from '../../mlkit';
const TakePhotoContainer = styled.View`
  flex: 1;
  background-color: #000;
`;
const CameraContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  background-color: #000;
`;
const MenuContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.2);
`;
const BtnTakePhoto = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #9e80f2;
  border-width: 5px;
  border-color: #fff;
  align-items: center;
  justify-content: center;
`;
const OtherBtn = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
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
const TakePhotoScreen: FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'TakePhotoScreen'>
    >();
  const [uriImage, setUriImage] = React.useState<string | null>(null);
  const [typeImage, setTypeImage] = React.useState<string | null>(null);
  const handleBack = () => navigation.goBack();
  const [blocResponse, setBlocResponse] = React.useState<Response | null>(null);
  const [response, setResponse] = React.useState<ImagePickerResponse | null>(
    null,
  );

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
  const deleteImage = () => {
    setUriImage(null);
    setBlocResponse(null);
  };

  React.useEffect(() => {
    (async () => {
      if (response && !response.didCancel) {
        cropImage(response.assets![0].uri!);
      }
    })();
  }, [response]);

  const cropImage = (uri: string) => {
    ImagePicker.openCropper({
      path: uri,
      mediaType: 'photo',
    })
      .then(image => {
        setResponse(null);
        setUriImage(image.path);
        setTypeImage(image.mime);
        proccessImage(image.path.toString());
        const Lable = NativeModules.LabelImagesModule.labelImage(image.path);
        console.log(Lable);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const proccessImage = async (url: string) => {
    if (url) {
      try {
        const response = await recognizeImage(url);
        if (response?.blocks?.length > 0) {
          console.log(response, 'response');
          setBlocResponse(response);
        } else {
          Alert.alert('Error', 'Vui long chup lai');
          setUriImage(null);
        }
      } catch (error) {
        Alert.alert('Error', 'Vui long chup lai');
        setUriImage(null);
        console.log('error');
        console.log(error);
      }
    }
  };

  const handleNext = () => {
    blocResponse &&
      navigation.navigate('AnalyzeExercisesScreen', {
        uriImage: uriImage || '',
        blocResponse: blocResponse,
        typeImage: (typeImage && typeImage) || '',
      });
  };

  return (
    <TakePhotoContainer>
      <CameraContainer>
        {uriImage ? (
          <Image resizeMode="contain" source={{uri: uriImage}} />
        ) : (
          <AntDesign name="camera" size={50} color="rgba(255, 255, 255, 0.8)" />
        )}
      </CameraContainer>
      <MenuContainer>
        {uriImage ? (
          <>
            <OtherBtn onPress={deleteImage}>
              <Ionicons
                name="arrow-back"
                size={25}
                color="rgba(255, 255, 255, 0.8)"
              />
            </OtherBtn>
            <BtnTakePhoto onPress={handleNext}>
              <Entypo name="check" size={25} color="#fff" />
            </BtnTakePhoto>
          </>
        ) : (
          <>
            <OtherBtn onPress={handleBack}>
              <AntDesign
                name="close"
                size={25}
                color="rgba(255, 255, 255, 0.8)"
              />
            </OtherBtn>
            <BtnTakePhoto
              onPress={() => {
                onButtonPress('capture', {
                  saveToPhotos: true,
                  mediaType: 'photo',
                  includeBase64: false,
                });
              }}>
              <Feather name="instagram" size={25} color="#fff" />
            </BtnTakePhoto>
            <OtherBtn
              onPress={() => {
                onButtonPress('library', {
                  selectionLimit: 0,
                  mediaType: 'photo',
                  includeBase64: false,
                });
              }}>
              <FontAwesome5
                name="images"
                size={25}
                color="rgba(255, 255, 255, 0.7)"
              />
            </OtherBtn>
          </>
        )}
      </MenuContainer>
    </TakePhotoContainer>
  );
};

export default TakePhotoScreen;
