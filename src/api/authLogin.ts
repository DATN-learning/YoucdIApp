import axiosClient from '../libs/api/axiosClient';
import {apiRouters} from '../configs/apiRouters';
import {
  ILoginByGmailPayload,
  ILoginByTokenPayload,
  ILogOutPayload,
} from '../interfaces/Login';

const resgisterAccount = (
  lastName: string,
  firstName: string,
  email: string,
  pass: string,
) => {
  const data = {
    last_name:lastName,
    first_name:firstName,
    email:email,
    password:pass,
  };
  const response = axiosClient.post<{
    status: boolean;
    message: string;
  }>(apiRouters.registerAccount, data);
  return response;
};

const loginByEamil = (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  const response = axiosClient.post<ILoginByGmailPayload>(
    apiRouters.loginByGmail,
    data,
  );
  return response;
};
const loginByToken = () => {
  const response = axiosClient.post<ILoginByTokenPayload>(
    apiRouters.loginByToken,
  );
  return response;
};
const logoutApp = (email: string) => {
  const data = {
    email,
  };
  const response = axiosClient.post<ILogOutPayload>(apiRouters.logout, data);
  return response;
};
const createDeviceToken = (id_token_notification: string, token: string) => {
  const data = {
    id_token_notification,
    token,
    device: 'MOBILE',
  };
  const response = axiosClient.post<{
    status: boolean;
    message: string;
  }>(apiRouters.createDeviceToken, data);
  return response;
};

const updateProfile = async ({
  first_name,
  last_name,
  nick_name,
  address,
  date_of_birth,
  gender,
  hashtag,
  level_number,
  experience_point,
  number_stars,
  school_name,
  class_room_id,
  id_image,
  id_cover_image,
} : {
  first_name:string,
  last_name:string,
  nick_name:string,
  address:string,
  date_of_birth:string,
  gender:string,
  hashtag:string,
  level_number:string,
  experience_point:string,
  number_stars:string,
  school_name:string,
  class_room_id:string,
  id_image: string,
  id_cover_image: string,

}) => {
  const formData = new FormData();

  // Thêm các trường thông tin vào FormData
  formData.append('first_name', first_name || '');
  formData.append('last_name', last_name || '');
  formData.append('nick_name', nick_name || '');
  formData.append('address', address || '');
  formData.append('date_of_birth', date_of_birth || '');
  formData.append('gender', gender || '');
  formData.append('hashtag', hashtag || '');
  formData.append('level_number', level_number || '');
  formData.append('experience_point', experience_point || '');
  formData.append('number_stars', number_stars || '');
  formData.append('school_name', school_name || '');
  formData.append('class_room_id', class_room_id || '');

  // Xử lý file upload
  if (id_image) {
    formData.append('id_image',id_image );
  }

  if (id_cover_image) {
    formData.append('id_cover_image', id_cover_image);
  }

  try {
    const response = axiosClient.post<ILoginByTokenPayload>(apiRouters.updateprofile, formData);
    return response;
  } catch (error) {
    throw error;
  }
};


export {loginByEamil, loginByToken, logoutApp, createDeviceToken,resgisterAccount,updateProfile};
