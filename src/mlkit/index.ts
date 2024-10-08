import {NativeModules} from 'react-native';

const {TextRecognitionModule,TranslateLanguageModule} = NativeModules;

export type Rect = {
  left: number;
  top: number;
  height: number;
  width: number;
};
export type Line = {
  text: string;
  rect: Rect;
};
export type Block = {
  text: string;
  rect: Rect;
  lines: Line[];
};
export type Response = {
  width: number;
  height: number;
  blocks: Block[];
};
export type Language = {
  code: string;
}

export const recognizeImage = (url: string): Promise<Response> => {
  return TextRecognitionModule.recognizeImage(url);
};

export const translateText = (text: string, sourceLanguage: string, targetLanguage: string): Promise<string> => {
  return TranslateLanguageModule.TranslateLanguage(text, sourceLanguage, targetLanguage);
}

