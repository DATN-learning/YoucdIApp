enum EClassRoomActionType {
    GET_SUBJECT_CLASSROOM_REQUEST = 'ACTION/GET_SUBJECT_CLASSROOM_REQUEST',
    GET_SUBJECT_CLASSROOM_SUCCESS = 'ACTION/GET_SUBJECT_CLASSROOM_SUCCESS',
    GET_SUBJECT_CLASSROOM_FAILURE = 'ACTION/GET_SUBJECT_CLASSROOM_FAILURE',
    CHOOSE_CLASSROOM = 'ACTION/CHOOSE_CLASSROOM',
    CHOOSE_SUBJECT = 'ACTION/CHOOSE_SUBJECT',
    SET_LIST_QUESTION_CHAPTER = 'ACTION/SET_LIST_QUESTION_CHAPTER',
    SET_CHAPTER_ENABLE = 'ACTION/SET_CHAPTER_ENABLE',
}

interface IChooseSubject {
    name: string;
    id: string;
    id_relation: number;
}

interface ISetChapterEnable {
    id: number;
    name: string;
    number: number;
}

export { EClassRoomActionType };
export type { IChooseSubject, ISetChapterEnable };
