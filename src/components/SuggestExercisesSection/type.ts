import { IPostSuggestion } from "../../interfaces/Post";

export interface SuggestExercisesSectionProps {
    topSuggestions:string;
    setTopSuggestions:(data:string)=>void;
    listSuggest : string[];
    setListSuggest:(data:string[])=>void;
}

export interface IItemPostSuggestProps{
    item:IPostSuggestion;
}