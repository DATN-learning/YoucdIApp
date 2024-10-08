import axiosClient from '../libs/api/axiosClient';
import {apiRouters} from '../configs/apiRouters';
import {
  IChapterExercisesSuccessPayload,
  IChapterSubjectSuccessPayload,
} from '../interfaces/Subject';
import {ILessionPayLoad} from '../interfaces/Lession';

export const getChapterSubjectList = (subject_id: string) => {
  const data = {
    subject_id,
  };

  const response = axiosClient.post<IChapterSubjectSuccessPayload>(
    apiRouters.getChapterSubject,
    data,
  );
  return response;
};

export const getChapterExercises = (subject_id: string) => {
  const data = {
    subject_id,
  };
  const response = axiosClient.post<IChapterExercisesSuccessPayload>(
    apiRouters.getChapterExercises,
    data,
  );
  return response;
};

export const getLessionById = (
  id_lession: Number,
  chapter_subject_id: Number,
) => {
  const data = {
    id_lession,
    chapter_subject_id,
  };

  const response = axiosClient.post<ILessionPayLoad>(
    apiRouters.getLessionById,
    data,
  );
  return response;
};
