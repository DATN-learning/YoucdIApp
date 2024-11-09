import {View, ScrollView, Dimensions, TouchableOpacity, Modal, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  width: ${(props: {isPortrait: boolean}) => (props.isPortrait ? width : height)}px;
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

const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-height: 400px;
`;

const LanguageOption = styled.TouchableOpacity`
  padding: 10px;
`;

const LanguageText = styled.Text`
  font-size: 18px;
`;

const languages = [
  {label: 'English', code: 'en'},
  {label: 'Vietnamese', code: 'vi'},
  {label: 'Spanish', code: 'es'},
  {label: 'French', code: 'fr'},
  {label: 'German', code: 'de'},
  {label: 'Chinese (Simplified)', code: 'zh'},
  {label: 'Japanese', code: 'ja'},
  {label: 'Korean', code: 'ko'},
  {label: 'Russian', code: 'ru'},
  {label: 'Italian', code: 'it'},
  {label: 'Portuguese', code: 'pt'},
  {label: 'Dutch', code: 'nl'},
  {label: 'Arabic', code: 'ar'},
  {label: 'Hindi', code: 'hi'},
  {label: 'Bengali', code: 'bn'},
  {label: 'Greek', code: 'el'},
  {label: 'Hebrew', code: 'he'},
  {label: 'Turkish', code: 'tr'},
  {label: 'Swedish', code: 'sv'},
  {label: 'Norwegian', code: 'no'},
  {label: 'Danish', code: 'da'},
  {label: 'Polish', code: 'pl'},
  {label: 'Czech', code: 'cs'},
  {label: 'Finnish', code: 'fi'},
  {label: 'Thai', code: 'th'},
  {label: 'Malay', code: 'ms'},
  {label: 'Indonesian', code: 'id'},
  {label: 'Hungarian', code: 'hu'},
  {label: 'Romanian', code: 'ro'},
  {label: 'Slovak', code: 'sk'},
  {label: 'Ukrainian', code: 'uk'},
  {label: 'Persian', code: 'fa'},
  {label: 'Swahili', code: 'sw'},
  {label: 'Filipino', code: 'fil'},
  {label: 'Urdu', code: 'ur'},
  {label: 'Serbian', code: 'sr'},
  {label: 'Croatian', code: 'hr'},
  {label: 'Bulgarian', code: 'bg'},
  {label: 'Icelandic', code: 'is'},
  {label: 'Latvian', code: 'lv'},
  {label: 'Lithuanian', code: 'lt'},
  {label: 'Slovenian', code: 'sl'},
  {label: 'Estonian', code: 'et'},
  {label: 'Mongolian', code: 'mn'},
  {label: 'Nepali', code: 'ne'},
  {label: 'Sinhala', code: 'si'},
  {label: 'Tamil', code: 'ta'},
  {label: 'Telugu', code: 'te'},
  {label: 'Kannada', code: 'kn'},
  {label: 'Marathi', code: 'mr'},
  {label: 'Gujarati', code: 'gu'},
  {label: 'Punjabi', code: 'pa'},
  {label: 'Khmer', code: 'km'},
];

const MenuTranslate = () => {
  const {orientation} = useAuth();
  const [text, setText] = useState('');
  const [textTranslate, setTextTranslate] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('vi');
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [languageToSelect, setLanguageToSelect] = useState('source'); // 'source' or 'target'

  useEffect(() => {
    (async () => {
      const res = await translateText(text, sourceLanguage, targetLanguage);
      console.log(res)
      setTextTranslate(res);
    })();
  }, [text, sourceLanguage, targetLanguage]);

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(textTranslate);
  };

  const handleLanguageSelect = (language: string) => {
    if (languageToSelect === 'source') {
      setSourceLanguage(language);
    } else {
      setTargetLanguage(language);
    }
    setIsLanguageModalVisible(false);
  };

  return (
    <MenuTranslateContainer isPortrait={orientation === 'portrait'}>
      <MenuSelectContainer>
        <LanguageContainer onPress={() => {
          setLanguageToSelect('source');
          setIsLanguageModalVisible(true);
        }}>
          <LanguageLabel style={stylesTM.fontVR}>
            {languages.find(lang => lang.code === sourceLanguage)?.label || 'Select'}
          </LanguageLabel>
          <AntDesign name="caretdown" size={10} color="#000" />
        </LanguageContainer>

        <TouchableOpacity onPress={swapLanguages}>
          <AntDesign name="swap" size={20} color="#000" />
        </TouchableOpacity>

        <LanguageContainer onPress={() => {
          setLanguageToSelect('target');
          setIsLanguageModalVisible(true);
        }}>
          <LanguageLabel style={stylesTM.fontVR}>
            {languages.find(lang => lang.code === targetLanguage)?.label || 'Select'}
          </LanguageLabel>
          <AntDesign name="caretdown" size={10} color="#000" />
        </LanguageContainer>
      </MenuSelectContainer>

      <BodyTranslateContainer>
        <SourceLanguageContainer>
          <SourceLanguageInput
            multiline={true}
            placeholder="Enter text to translate"
            placeholderTextColor="#9e80f2"
            style={stylesTM.fontVR}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={text}
            onChangeText={setText}
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
              {textTranslate || 'Translation will appear here'}
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

      {/* Modal for Language Selection with ScrollView */}
      <Modal visible={isLanguageModalVisible} transparent={true}>
        <ModalBackground>
          <ModalContainer>
            <ScrollView>
              {languages.map(lang => (
                <LanguageOption key={lang.code} onPress={() => handleLanguageSelect(lang.code)}>
                  <LanguageText>{lang.label}</LanguageText>
                </LanguageOption>
              ))}
            </ScrollView>
          </ModalContainer>
        </ModalBackground>
      </Modal>
    </MenuTranslateContainer>
  );
};

export default MenuTranslate;
