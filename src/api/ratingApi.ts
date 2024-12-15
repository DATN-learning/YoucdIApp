import { apiRouters } from "../configs/apiRouters";
import { IRatingPayload } from "../interfaces/Ratings";
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
  