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

export {loginByEamil, loginByToken, logoutApp, createDeviceToken,resgisterAccount};
