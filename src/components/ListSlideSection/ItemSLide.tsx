//import liraries
import React, {FC} from 'react';
import {View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Pdf from 'react-native-pdf';
import {ITemSlideProps} from './type';
// create a component
const Container = styled.View`
  width: ${Dimensions.get('window').width / 2}px;
  background-color: red;
  height: 120px;
`;
const BtnContainer = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props: {isShow: boolean}) =>
    props.isShow ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  width: 100%;
  height: 100%;
  border-width: 5px;
  border-color: #fff;
`;
const ItemSLide: FC<ITemSlideProps> = props => {
  const {slide, isShow, setIndexSlideShow, index} = props;
  const pdfRef = React.useRef<Pdf>(null);
  return (
    <Container>
      <Pdf
        source={{
          uri: slide.pdf_file,
          cache: true,
        }}
        ref={pdfRef}
        trustAllCerts={false}
        enablePaging={true}
        style={{flex: 1, width: '100%', backgroundColor: '#fff'}}
        horizontal={true}
      />
      <BtnContainer
        onPress={() => {
          setIndexSlideShow(index);
        }}
        isShow={isShow}
      />
    </Container>
  );
};

//make this component available to the app
export default ItemSLide;
