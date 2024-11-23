import { apiRouters } from "../configs/apiRouters";
import { IChapterSubjectSuccessPayloads } from "../interfaces/Subject";
import axiosClient from "../libs/api/axiosClient";

export const getUserLastLesson = (
  user_id: string,
) => {
  const data = {
    user_id,
  };

  return axiosClient.post<IChapterSubjectSuccessPayloads>(
    apiRouters.getUserLastLesson,
    data,
  );
};
