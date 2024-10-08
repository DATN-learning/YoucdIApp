import * as React from 'react';
import {Text, View, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {TournamentCardProps} from './type';
const {width, height} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextMyfont from '../TextMyfont ';

const TournamentCardContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${height / 3.5}px;
  margin-bottom: 10px;
  justify-content: center;
  padding-left: 10px;
`;

const TournamentCardContent = styled(LinearGradient)`
  width: 85%;
  height: 100%;
  border-radius: ${width / 20}px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 0.5px solid #ccc;
`;
const StatusTournamentContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  border-top-left-radius: ${width / 20}px;
  border-top-right-radius: ${width / 20}px;
  padding: 10px;
`;
const LabelStatus = styled(TextMyfont)`
  font-size: 16px;
  color: #fff;
`;

const InfoTournamentContainer = styled.View`
  width: 100%;
  height: 40%;
  background-color: #eeeeee;
  margin-top: auto;
  border-bottom-left-radius: ${width / 20}px;
  border-bottom-right-radius: ${width / 20}px;
  padding: 10px;
`;
const ImageContainer = styled.View`
  position: absolute;
  width: 40%;
  right: 0px;
  height: 40%;
`;
const ImageLottie = styled(LottieView)``;
const LabelTournament = styled(TextMyfont)`
  font-size: 20px;
  color: #8294c4;
`;
const DescriptionTournament = styled(TextMyfont)`
  font-size: 16px;
  color: #8294c4;
`;
const ImageStatusContainer = styled.View`
  width: 50px;
  height: 50px;
`;
const ImageStatus = styled(LottieView)``;

const TournamentCard: React.FC<TournamentCardProps> = props => {
  return (
    <TournamentCardContainer>
      <TournamentCardContent
        start={{x: 0, y: 0}}
        colors={['#8294C4', '#8294C4', '#8294C4']}>
        <StatusTournamentContainer>
          <ImageStatusContainer>
            <ImageStatus
              source={{
                uri: 'http://10.10.21.90:8000/json/23664-sword-battle.json',
              }}
              autoPlay
              loop
            />
          </ImageStatusContainer>
          <ImageStatusContainer>
            <ImageStatus
              source={{
                uri: 'http://10.10.21.90:8000/json/49009-follow-animation-for-entri.json',
              }}
              autoPlay
              loop
            />
          </ImageStatusContainer>
        </StatusTournamentContainer>
        <LabelStatus>16 người đang chơi</LabelStatus>
        {/* <LabelStatus>16 người theo dõi</LabelStatus> */}
        <LabelStatus>3:00 PM 20/10/2020</LabelStatus>
        <InfoTournamentContainer>
          <LabelTournament>Giải ao làng</LabelTournament>
          <DescriptionTournament>
            Giải đấu dành cho các đội tuyển trong khu vực
          </DescriptionTournament>
        </InfoTournamentContainer>
      </TournamentCardContent>
      <ImageContainer>
        <ImageLottie
          source={{
            uri: 'http://10.10.21.90:8000/json/31177-winning-cup.json',
          }}
          autoPlay
          loop
        />
      </ImageContainer>
    </TournamentCardContainer>
  );
};

export default TournamentCard;
