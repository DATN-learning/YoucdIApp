import { IPdf } from "../../interfaces/pdf";


export interface ListSlideSectionProps {
    data: IPdf[];
    indexSlideShow: number;
    setIndexSlideShow: (index: number) => void;
}
export interface ITemSlideProps{
    slide: IPdf;
    isShow: boolean;
    index: number;
    setIndexSlideShow: (index: number) => void;
}