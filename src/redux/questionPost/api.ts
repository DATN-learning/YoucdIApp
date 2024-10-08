import axiosClient from '../../libs/api/axiosClient';
import {apiRouters} from '../../configs/apiRouters';
import {IPost, IPostDetailsPayload} from '../../interfaces/Post';

export const getQuestionPostByID = async (id_post: string) => {
  const data = {
    id_post,
  };
  const response = await axiosClient.post<IPostDetailsPayload>(
    apiRouters.getPostById,
    data,
  );
  return response;
};

