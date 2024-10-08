import axios from 'axios';
import axiosClient from '../../libs/api/axiosClient';
import { apiRouters } from '../../configs/apiRouters';
import { IClassSuccessPayload } from '../../interfaces/Class';

export const getClass = async () => {
  try {
    const response = await axiosClient.get<IClassSuccessPayload>(apiRouters.getClassRoom);
    return response.data.data.class;
  } catch (error) {
    console.log(error);
  }
};
