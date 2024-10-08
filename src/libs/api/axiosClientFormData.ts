import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {configs} from '../../utils/constant';
const config: AxiosRequestConfig = {
  baseURL: configs.apiLink,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const axiosClientFormData: AxiosInstance = axios.create(config);

axiosClientFormData.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle errors
    Promise.reject(error);
  },
);

axiosClientFormData.interceptors.response.use(
  response => {
    if (response) {
      return response;
    }
    return response;
  },
  error => {
    // Handle errors
    throw error;
  },
);

export default axiosClientFormData;
