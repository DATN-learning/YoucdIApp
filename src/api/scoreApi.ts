import { apiRouters } from "../configs/apiRouters";
import { IScoresPayload } from "../interfaces/Score";
import axiosClient from "../libs/api/axiosClient";


export const submitChapterAnswer = (
  id_score: string,
  user_id: string,
  question_query_id: string,
  answers: { question_id: number; answer_id: string }[]
) => {
  const data = {
    id_score,
    user_id,
    question_query_id,
    answers,
  };

  return axiosClient.post<IScoresPayload>(
    apiRouters.submitChapterAnswer,
    data,
  );
};

export const getPointChapter = (
  user_id: string,
  question_query_id: string,
) => {
  const data = {
    user_id,
    question_query_id,
  }

  return axiosClient.post<IScoresPayload>(
    apiRouters.getPointChapter,
    data,
  );
}