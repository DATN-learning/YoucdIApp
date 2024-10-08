import {View, Text} from 'react-native';
import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {GIFJSON} from '../utils/constant';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../routes/RootStack';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
type SplashNavigationProps = StackScreenProps<
  RootStackParamList,
  'Splashscreen'
>;
const Splashscreen: FC = () => {
  const navigation = useNavigation<SplashNavigationProps['navigation']>();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LearnNavigation');
    }, 2000);
  }, []);

  return (
    <Container>
      <LottieView
        source={GIFJSON.Loading}
        autoPlay
        loop
        speed={1.2}
        style={{width: 200, height: 200}}
      />  
    </Container>
  );
};

export default Splashscreen;
