import { type RGBcolor, type TextTheme } from "@/types/Presentation";

import {type ThemeName} from './ThemeName';

export interface ThemeOptions {
    background_color : RGBcolor,
    objects_color : RGBcolor,
    font_info : {
        titles : TextTheme,
        main_texts : TextTheme,
        lists_markers ?: TextTheme
    }
}

export interface PresTheme {
    name ?: ThemeName,
    options : ThemeOptions
}