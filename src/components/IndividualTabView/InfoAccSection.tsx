// import * as React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import styled from 'styled-components/native';
// import {useAuth} from '../../configs/AuthProvider';
// import TextMyfont from '../TextMyfont ';
// import { AppColors } from '../../utils/constant';

// const InfoAccSectionContainer = styled.View`
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   flex-direction: row;
//   padding:  10px 0px;
// `;
// const InfoAccContainer = styled.View`
//   flex: 1;
//   padding: 10px;
// `;
// const AvatarAccContainer = styled.View`
//   padding: 10px;
//   justify-content: center;
// `;
// const AvatarAcc = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
// `;
// const NameAcc = styled(TextMyfont)`
//   font-size: 20px;
//   color: ${AppColors.purple};
// `;
// const EmailAcc = styled(TextMyfont)`
//   font-size: 15px;
//   color: ${AppColors.purple};
// `;
// interface InfoAccSectionProps {}

// const InfoAccSection: React.FC<InfoAccSectionProps> = props => {
//   const {user} = useAuth();
//   return (
//     <InfoAccSectionContainer
//     style={{
//         borderBottomWidth: 1,
//         borderBottomColor: '#e8e8e8',
//     }}
//     >
//       <InfoAccContainer>
//         <NameAcc>
//           {user.first_name} {user.last_name}
//         </NameAcc>
//         <EmailAcc>{user.email}</EmailAcc>
//       </InfoAccContainer>
//       <AvatarAccContainer>
//         <AvatarAcc
//           source={{
//             uri: 'https://videogames.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTk1Mjk1MDkxNTgwMDIwMDI2/genshin-impact-ayaka-card-1.png',
//           }}
//         />
//       </AvatarAccContainer>
//     </InfoAccSectionContainer>
//   );
// };

// export default InfoAccSection;


import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Button, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'react-native-image-picker';
import {useAuth} from '../../configs/AuthProvider';
import {AppColors} from '../../utils/constant';
import { updateProfile } from '../../api/authLogin';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${AppColors.purple};
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid ${AppColors.purple};
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const ImagePickerContainer = styled.View`
  align-items: center;
  margin-bottom: 15px;
`;

const SelectedImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 10px;
`;

const AvatarAccContainer = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const AvatarAcc = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const UpdateProfileScreen: React.FC = () => {
  const {user} = useAuth(); 
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    nick_name: '',
    address: '',
    date_of_birth: '',
    gender: '',
    hashtag: '',
    level_number: '',
    experience_point: '',
    number_stars: '',
    school_name: '',
    class_room_id: '',
    id_image: null,
    id_cover_image: null,
  });

  // Chọn ảnh từ thư viện
  // const selectImage = async (field: 'id_image' | 'id_cover_image') => {
  //   const result = await ImagePicker.launchImageLibrary({
  //     mediaType: 'photo',
  //     quality: 0.8,
  //   });
  //   if (!result.didCancel && result.assets?.length > 0) {
  //     setFormData({...formData, [field]: result.assets[0]});
  //   }
  // };

  // // Xử lý submit form
  // const handleSubmit = async () => {
  //   try {
  //     const response = await updateProfile({
  //       formData
  //     });
  //     Alert('Profile updated successfully');
  //   } catch (error) {
  //     Alert('Failed to update profile. Please try again.');
  //   }
  // };

  return (
    <Container>
      <AvatarAccContainer>
        <AvatarAcc
          source={{
            uri: 'https://videogames.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTk1Mjk1MDkxNTgwMDIwMDI2/genshin-impact-ayaka-card-1.png',
          }}
        />
      </AvatarAccContainer>
      <Label>First Name</Label>
      <Input
        placeholder="Enter first name"
        value={formData.first_name}
        onChangeText={(text) => setFormData({...formData, first_name: text})}
      />

      <Label>Last Name</Label>
      <Input
        placeholder="Enter last name"
        value={formData.last_name}
        onChangeText={(text) => setFormData({...formData, last_name: text})}
      />

      <Label>Nick Name</Label>
      <Input
        placeholder="Enter nick name"
        value={formData.nick_name}
        onChangeText={(text) => setFormData({...formData, nick_name: text})}
      />

      <Label>Address</Label>
      <Input
        placeholder="Enter address"
        value={formData.address}
        onChangeText={(text) => setFormData({...formData, address: text})}
      />

      <Label>Date of Birth</Label>
      <Input
        placeholder="YYYY-MM-DD"
        value={formData.date_of_birth}
        onChangeText={(text) => setFormData({...formData, date_of_birth: text})}
      />

      <Label>Gender</Label>
      <Input
        placeholder="Enter gender"
        value={formData.gender}
        onChangeText={(text) => setFormData({...formData, gender: text})}
      />

      <Label>Hashtag</Label>
      <Input
        placeholder="Enter hashtag"
        value={formData.hashtag}
        onChangeText={(text) => setFormData({...formData, hashtag: text})}
      />

      <Label>Level Number</Label>
      <Input
        placeholder="Enter level number"
        value={formData.level_number}
        onChangeText={(text) => setFormData({...formData, level_number: text})}
      />

      <Label>Experience Points</Label>
      <Input
        placeholder="Enter experience points"
        value={formData.experience_point}
        onChangeText={(text) => setFormData({...formData, experience_point: text})}
      />

      <Label>Number of Stars</Label>
      <Input
        placeholder="Enter number of stars"
        value={formData.number_stars}
        onChangeText={(text) => setFormData({...formData, number_stars: text})}
      />

      <Label>School Name</Label>
      <Input
        placeholder="Enter school name"
        value={formData.school_name}
        onChangeText={(text) => setFormData({...formData, school_name: text})}
      />

      <Label>Class Room ID</Label>
      <Input
        placeholder="Enter class room ID"
        value={formData.class_room_id}
        onChangeText={(text) => setFormData({...formData, class_room_id: text})}
      />

      {/* Chọn hình đại diện */}
      <Label>Profile Image</Label>
      <ImagePickerContainer>
        {formData.id_image && (
          <SelectedImage source={{uri: formData.id_image}} />
        )}
        {/* <Button title="Select Profile Image" onPress={() => selectImage('id_image')} /> */}
        <Button title="Select Profile Image" />

      </ImagePickerContainer>

      {/* Chọn ảnh bìa */}
      <Label>Cover Image</Label>
      <ImagePickerContainer>
        {formData.id_cover_image && (
          <SelectedImage source={{uri: formData.id_cover_image}} />
        )}
        <Button title="Select Cover Image" />
        {/* <Button title="Select Cover Image" onPress={() => selectImage('id_cover_image')} /> */}
      </ImagePickerContainer>

      <Button title="Update Profile"  />
      {/* <Button title="Update Profile" onPress={handleSubmit} /> */}
    </Container>
  );
};

export default UpdateProfileScreen;
