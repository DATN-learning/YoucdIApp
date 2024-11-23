import { ILessionByChapterPayLoad } from "./Lession";

export interface IView{
    id: number,
    view_id:string,
    user_id:number,
    id_view_query:ILessionByChapterPayLoad,
    time_view:string,
}

export interface IViewPayLoad{
    status: boolean;
    message: string;
    data: IView[];
}