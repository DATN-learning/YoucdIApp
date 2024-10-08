import {View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import stylesTM from '../../themes/styles';
import {useAuth} from '../../configs/AuthProvider';
import {translateText} from '../../mlkit';
const {width, height} = Dimensions.get('window');

const MenuTranslateContainer = styled.View`
  width: ${(props: {isPortrait: boolean}) =>
    props.isPortrait ? width : height}px;
  height: 100%;
  padding: 0px 20px;
`;
const MenuSelectContainer = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding: 0px 0px 5px 0px;
`;
const LanguageContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const LanguageLabel = styled.Text`
  font-size: 16px;
  color: #000;
  margin-right: 5px;
`;
const BodyTranslateContainer = styled.View`
  flex: 1;
`;
const SourceLanguageContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
const TargetLanguageContainer = styled.View`
  flex: 1;
`;
const SourceLanguageInput = styled.TextInput`
  font-size: 16px;
  color: #9e80f2;
  padding: 2px 30px 2px 10px;
`;
const TargetLanguage = styled.Text`
  width: 100%;
  font-size: 16px;
  color: #9e80f2;
  padding: 2px 30px 2px 10px;
`;
const IconMic = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const IconSpeaker = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
const IconCopy = styled(IconMic)``;
const MenuTranslate = () => {
  const {orientation} = useAuth();
  const [text, setText] = React.useState('');
  const [textTranslate, setTextTranslate] = React.useState('');
  React.useEffect(() => {
    (async () => {
      console.log(text);
      const res = await translateText(text, 'en', 'vi');
      console.log(res);
      setTextTranslate(res);
    })();
  }, [text]);

  return (
    <MenuTranslateContainer
      isPortrait={orientation === 'portrait' ? true : false}>
      <MenuSelectContainer>
        <LanguageContainer>
          <LanguageLabel style={stylesTM.fontVR}>English</LanguageLabel>
          <AntDesign name="caretdown" size={10} color="#000" />
        </LanguageContainer>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="swap" size={20} color="#000" />
        </TouchableOpacity>
        <LanguageContainer>
          <LanguageLabel style={stylesTM.fontVR}>Việt Nam</LanguageLabel>
          <AntDesign name="caretdown" size={10} color="#000" />
        </LanguageContainer>
      </MenuSelectContainer>
      <BodyTranslateContainer>
        <SourceLanguageContainer>
          <SourceLanguageInput
            multiline={true}
            placeholder="Nhập nội dung cần dịch"
            placeholderTextColor="#9e80f2"
            style={stylesTM.fontVR}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={() => {
              console.log('submit');
            }}
          />
          <IconMic>
            <Fontisto name="mic" size={20} color="#9e80f2" />
          </IconMic>
          <IconSpeaker>
            <Ionicons name="ios-volume-low" size={25} color="#9e80f2" />
          </IconSpeaker>
        </SourceLanguageContainer>
        <TargetLanguageContainer>
          <ScrollView>
            <TargetLanguage style={stylesTM.fontVR}>
              {textTranslate.length > 0 ? textTranslate : 'Dịch nội dung'}
            </TargetLanguage>
          </ScrollView>
          <IconCopy>
            <Feather name="copy" size={20} color="#9e80f2" />
          </IconCopy>
          <IconSpeaker>
            <Ionicons name="ios-volume-low" size={25} color="#9e80f2" />
          </IconSpeaker>
        </TargetLanguageContainer>
      </BodyTranslateContainer>
    </MenuTranslateContainer>
  );
};

export default MenuTranslate;
