import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useAuth} from '../../configs/AuthProvider';
import TextMyfont from '../TextMyfont ';
import { AppColors } from '../../utils/constant';

const InfoAccSectionContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding:  10px 0px;
`;
const InfoAccContainer = styled.View`
  flex: 1;
  padding: 10px;
`;
const AvatarAccContainer = styled.View`
  padding: 10px;
  justify-content: center;
`;
const AvatarAcc = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const NameAcc = styled(TextMyfont)`
  font-size: 20px;
  color: ${AppColors.purple};
`;
const EmailAcc = styled(TextMyfont)`
  font-size: 15px;
  color: ${AppColors.purple};
`;
interface InfoAccSectionProps {}

const InfoAccSection: React.FC<InfoAccSectionProps> = props => {
  const {user} = useAuth();
  return (
    <InfoAccSectionContainer
    style={{
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
    }}
    >
      <InfoAccContainer>
        <NameAcc>
          {user.first_name} {user.last_name}
        </NameAcc>
        <EmailAcc>{user.email}</EmailAcc>
      </InfoAccContainer>
      <AvatarAccContainer>
        <AvatarAcc
          source={{
            uri: 'https://videogames.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTk1Mjk1MDkxNTgwMDIwMDI2/genshin-impact-ayaka-card-1.png',
          }}
        />
      </AvatarAccContainer>
    </InfoAccSectionContainer>
  );
};

export default InfoAccSection;
