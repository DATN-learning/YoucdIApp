import { apiRouters } from "../configs/apiRouters";
import { IChapterSubjectSuccessPayloads } from "../interfaces/Subject";
import { IViewPayLoad } from "../interfaces/View";
import axiosClient from "../libs/api/axiosClient";
import axiosClientFormData from "../libs/api/axiosClientFormData";

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

export const startView = ({
  view_id,
  user_id,
  id_view_query,
  time_view
} : {
  view_id:string,
  user_id:string,
  id_view_query:string,
  time_view:number
}) => {
  const formData = new FormData();
  formData.append('view_id', view_id);
  formData.append('user_id', user_id);
  formData.append('id_view_query', id_view_query);
  formData.append('time_view', time_view);

  const response = axiosClientFormData.post<IViewPayLoad>(apiRouters.startView,formData);
  return response;
}