import {
    StyleProp,
    TextStyle,
    ViewStyle,
  } from 'react-native';
import React from 'react';
export interface ButtonProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    corlorLinear: string[];
    nameMenu: string;
    changeMenuActive: (nameMenu: string) => void;
}