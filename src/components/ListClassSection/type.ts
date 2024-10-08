import { IClass } from "../../models/LearnHome";

export interface IListClassSectionProps {
    data: IClass[];
    setIsShowPopupClass: (isShow: boolean) => void;
}
export interface IClassProps {
    class: IClass;
    onPress : (classId: number) => void;
}