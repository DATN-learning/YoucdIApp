import {View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import styled from 'styled-components/native';

import stylesTM from '../../themes/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAuth} from '../../configs/AuthProvider';
const {width, height} = Dimensions.get('window');

const MenuKeyBoardContainer = styled.View`
  width: ${(props: {isPortrait: boolean}) =>
    props.isPortrait ? width : height}px;
  height: 100%;
  padding: 0px 20px;
`;
const Label = styled.Text`
  font-size: 30px;
  color: #000;
`;
const InputContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InputSection = styled.View`
  width: 80%;
  background-color: #bba7f1;
  padding: 10px;
  border-radius: 10px;
`;
const TextInputCN = styled.View`
  width: 100%;
  background-color: #9e80f2;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
`;
const TextInputST = styled(TextInput)`
  padding: 7px;
  flex: 1;
`;

interface Props {
  isActive: boolean;
}

const MenuKeyBoard: FC<Props> = props => {
  const {orientation} = useAuth();
  const textInputRef = React.useRef<TextInput>(null);
  const [text, setText] = React.useState<string>('');

  return (
    <MenuKeyBoardContainer
      isPortrait={orientation === 'portrait' ? true : false}>
      <Label numberOfLines={2} style={[stylesTM.fontVR]}>
        Khám Phá {'\n'}Những Điều Hay{' '}
      </Label>
      <InputContainer>
        <InputSection>
          <TextInputCN>
            <TextInputST
              ref={textInputRef}
              placeholder="Nhập câu hỏi "
              placeholderTextColor="#ffffff"
              style={[stylesTM.fontVR]}
              onChangeText={text => setText(text)}
              value={text}
            />
            {text.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setText('');
                }}>
                <AntDesign
                  name="closecircle"
                  size={15}
                  color="#ffffff"
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            ) : null}
            <AntDesign
              name="search1"
              size={25}
              color="#ffffff"
              style={{marginRight: 10}}
            />
          </TextInputCN>
        </InputSection>
      </InputContainer>
    </MenuKeyBoardContainer>
  );
};

export default MenuKeyBoard;
