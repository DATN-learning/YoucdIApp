import { apiRouters } from "../configs/apiRouters";
import { IRatingPayload, IRatingPayloads } from "../interfaces/Ratings";
import axiosClient from "../libs/api/axiosClient";

export const addRating = async (
    rating_id:string,
    user_id: string,
    lesstion_chapter_id: number,
    content: string,
    rating: string,
  ) => {
    const data = {
        rating_id,
        user_id,
        lesstion_chapter_id,
        content,
        rating,
    };
    const response = await axiosClient.post<IRatingPayload>(
      apiRouters.createRating,
      data
    );
    return response;
};

export const getRatingByLessionChapterId = async (
  lesstion_chapter_id: number,
) => {
  const data = {
    lesstion_chapter_id
  };
  const response = await axiosClient.post<IRatingPayloads>(
    apiRouters.getRatingByLessionChapterId,
    data
  );
  return response;
};
