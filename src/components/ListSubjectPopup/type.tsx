import { ISubject } from "../../interfaces/Class";

export interface IListSubjectectionProps {
    data: ISubject[];
    setIsShowPopupSubject: (isShow: boolean) => void;
    isBtnChooseAll?: boolean;
}

export interface ISubjectProps {
    subject: ISubject;
    onPress : (id: string, id_relation: number, name: string) => void;
}