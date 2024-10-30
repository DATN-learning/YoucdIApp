import {apiRouters} from '../configs/apiRouters';
import axiosClientFormData from '../libs/api/axiosClientFormData';
import axiosClient from '../libs/api/axiosClient';
import {
  ICommentPostPayloadPagination,
  ICreateCommentPostPayload,
  ICreatePostPayload,
  IPostPayloadPagination,
} from '../interfaces/Post';

export const createPost = ({
  id_post,
  user_id,
  title,
  description,
  class_room_id,
  subject_id,
  image_post,
  list_text,
  typeImage,
  label
}: {
  id_post: string;
  user_id: number;
  title: string;
  description: string;
  class_room_id: number | null;
  subject_id: number | null;
  image_post: string;
  list_text: string[];
  typeImage: any;
  label:string
}) => {
  const formData = new FormData();
  formData.append('id_post', id_post);
  formData.append('user_id', user_id.toString());
  formData.append('title', title);
  formData.append('description', description);
  formData.append('class_room_id', class_room_id);
  formData.append('label', label?label:'');
  subject_id && subject_id > -1 && formData.append('subject_id', subject_id);
  formData.append('photos[]', {
    uri: image_post,
    type: typeImage,
    name: 'image_post',
  });
  if (list_text.length > 0) {
    list_text.forEach((text, index) => {
      formData.append(`list_text[${index}]`, text);
    });
  }

  const response = axiosClientFormData.post<ICreatePostPayload>(
    apiRouters.createPostQuestion,
    formData,
  );
  return response;
};

export const getPostByClassAndSub = ({
  classRoom,
  subject,
  per_page,
  page,
}: {
  classRoom: number;
  subject: number | null;
  per_page: number;
  page: number;
}) => {
  const response = axiosClient.get<IPostPayloadPagination>(
    `${apiRouters.getPostByClassAndSub}?class=${classRoom}&subject=${
      subject || ''
    }&per_page=${per_page}&page=${page}`,
  );

  return response;
};

export const getCommentByPost = ({
  id_post,
  limit,
  page,
}: {
  id_post: string;
  limit: number;
  page: number;
}) => {
  const response = axiosClient.get<ICommentPostPayloadPagination>(
    `${apiRouters.getCommentByPost}?id_post=${id_post}&limit=${limit}&page=${page}`,
  );
  return response;
};

export const createCommentPostApi = ({
  comment_id,
  id_post,
  user_id,
  title_comment,
  description_comment,
  image_comment,
  typeImage,
}: {
  comment_id: string;
  id_post: string;
  user_id: string;
  title_comment: string;
  description_comment: string;
  image_comment: any;
  typeImage: any;
}) => {
  const formData = new FormData();
  formData.append('comment_id', comment_id);
  formData.append('id_post', id_post);
  formData.append('user_id', user_id.toString());
  formData.append('title_comment', title_comment);
  formData.append('description_comment', description_comment);
  image_comment &&
    formData.append('image', {
      uri: image_comment,
      type: typeImage,
      // random name
      name: 'image_comment' ,
    });
  const response = axiosClientFormData.post<ICreateCommentPostPayload>(
    apiRouters.createCommentPost,
    formData,
  );
  return response;
};
