import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";


export interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    children: React.ReactNode;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    iconMinus?: React.ReactNode;
    animationType?: 'none' | 'slide' | 'fade';
    maxHeight?: string;
}

export interface BottomPopUpProps {
    children: React.ReactNode;
}
