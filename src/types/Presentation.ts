import type { Nullable } from './tools/Nullable';
import type { CSSProperties } from "vue"

export type RGBcolor = [number, number, number] // rgb параметры (максимум 3)

export interface resizedOrGrabedData {
    width : number,
    height : number,
    left : number,
    top : number,
    eventName : string
}

// полный объект презентации с метаданными
export interface PresentationObject {
    "id": number // id презентации
    "author" : number  // id автора
    "title" ?: Nullable<string> // Название презентации

    // В будущем должны быть тут
    // "group" : Nullable<number>  // id группы
    // "favourite" : boolean // добавлен ли в избранное
    // "removed" : boolean // добавлен ли в избранное
    // "date_created" : number // время создания в формате timestamp
    // "date_edited" : number // время посл. редактирования в формате timestamp
    // "theme" : Nullable<number> // id темы

    "json" : Presentation// сам json-объект презентации
}

export interface TextTheme {
    "bold" : Nullable<boolean>
    "italic" : Nullable<boolean>
    "color" : Nullable<RGBcolor>
}
export interface TextPropetties extends TextTheme {
    "name" : string | 'Calibri' | 'Arial'
    "size" : number
}

export interface PresThemeOptions {         // стили презенатции
    "name" ?: string                 // название темы
    "background_color" : RGBcolor    // rgb параметры (максимум 3)
    "objects_color" : RGBcolor
    "font_info": {                   // стили текста на слайдах
        "titles" : TextPropetties
        "main_texts" : TextPropetties
    }
}


export interface Presentation{
    
    // В будущем должны быть в PresentationObject
    "group" : Nullable<number>  // id группы
    "favourite" : boolean // добавлен ли в избранное
    "removed" : boolean // добавлен ли в избранное
    "date_created" : number // время создания в формате timestamp
    "date_edited" : number // время посл. редактирования в формате timestamp

    "len_slides": number,
    "title" : Nullable<string>           // Название презентации
    "theme" : PresThemeOptions,
    "slides": Slide[]                     // слайды

}

export interface Slide{
    "index": number
    "title" ?: Nullable<string> // тут заголовок слайда
    "theme" : {
        "background_color" : Nullable<RGBcolor> // rgb параметры (максимум 3)
        "background_img" : Nullable<string> // пути к изображениям заднего фона слайдов (максимум 3)
    }
    "content" : {
        "textboxes" : TextBox[]
        "pictures" : PictureBox[]
        "tables" : TableBox[] 
        "figures" : FigureBox[] 
        "graphics" : GraphicBox[] 
        // Все будущие контент-элементы будут тут
    }
}

// для всех контент-блоков
export interface ContentBlockParams {
    "left" : string //цифра + px
    "top" : string //цифра + px
    "width" : string //цифра + px
    "height" : string //цифра + px
    "z_index" ?: number
    "loading" ?: boolean
}
export interface ContentBlock extends ContentBlockParams {
    "background_color" : Nullable<RGBcolor>
}

export interface ContentBlockCSS extends ContentBlockParams {
    "contentBoxStyles" : CSSProperties
}

// текстовые блоки

// --------- дефолтные значения:
// шрифт - Calibri
// h1 - 44 Жирный
// h2 - 32 Жирный
// h3 - 28 Жирный
// p - 18 
// s - 14 
// l - 18

export type TextType = 'h1' | 'h2' | 'h3' | 'p' | 's' | 'l'
export type AlignType = Nullable<'left' | 'center' | 'right'>

export type ContentType = 'TextBox' | 'PictureBox' | 'TableBox' | 'FigureBox' | 'GraphicBox'

export interface TextBox extends ContentBlock {
    "type" : TextType
    "text": string
    // далее свойства используются в стилях
    "font_size": Nullable<number>
    "bold": Nullable<boolean>
    "italic" : Nullable<boolean>
    "align" : AlignType
    "underline" : Nullable<boolean>
    "lineThrough" : Nullable<boolean>
    "color" : Nullable<RGBcolor>
    // ...
}

export type PictureSourceType = 'data' | 'localSrc' | 'url'
// блоки с изображениями
export interface PictureBox extends ContentBlock{
    "url": Nullable<string | ArrayBuffer>,
    "type" ?: PictureSourceType
}


// 
export interface TableBox extends ContentBlock{
    "font_size": Nullable<number> //
    "columns" : string[] // названия колонок
    "rows" : string[][] // массив строк
    // ...
}
// 
export interface FigureBox extends ContentBlock{
    // ...
}
// 
export interface GraphicBox extends ContentBlock{
    // ...
}


export const testPres : PresentationObject = {
    "id": 46,
    "author": 8,
    "json": {
        "title": "Презентация",
        "len_slides": 1,
        "group": null,
        "favourite": false,
        "removed": false,
        "date_created": 1708951167,
        "date_edited": 1708951167,
        "theme": {
            "background_color": [255,248,220],
            "objects_color" : [155,248,220],
            "font_info": {
                "titles": {
                    "name": "Calibri",
                    "size": 44,
                    "bold": true,
                    "italic": false,
                    "color" : [100,155,50],
                },
                "main_texts": {
                    "name": "Calibri",
                    "size": 28,
                    "bold": false,
                    "italic": false,
                    "color" : [100,155,50],
                }
            }
        },
        "slides": [
            {
                "index": 0,
                "theme": {
                    "background_color": null,
                    "background_img": null
                },
                "content": {
                    "textboxes": [
                        {
                            "type": "h2",

                            "left": "60px",
                            "top": "40px",
                            "width": "757px",
                            "height": "300px",

                            "text": "\nТема 1: Мистическая атмосфера Парижа в эпоху испанской чумы",
                            "font_size": null,
                            "bold": null,
                            "background_color": null,
                            "italic": false,
                            "align": null,

                            "color" : [184,184,30],
                            "lineThrough" : null,
                            "underline" : null
                        },
                        {
                            "type": "p",

                            "left": "60px",
                            "top": "450px",
                            "width": "757px",
                            "height": "430px",

                            "text": "\nПариж в эпоху испанской чумы был пропитан мистической атмосферой, где тайные обряды и колдовство цвели на фоне страха и боли. В это время город казался пронизанным магией и загадками, притягивая как любопытных исследователей, так и тех, кто искал защиту от зла. Говорят, что в это время возник заговор ведьм, сговорившихся против испанской чумы, чтобы защитить город от разрушительной эпидемии.",
                            "font_size": null,
                            "bold": null,
                            "background_color": null,
                            "italic": false,
                            "align": null,

                            "color" : null,
                            "lineThrough" : null,
                            "underline" : null
                        }
                    ],
                    "pictures": [
                        {
                            "left": "957px",
                            "top": "80px",
                            "width": "883px",
                            "height": "920px",
                            "url": "/media/pictures/79ad515127f478d3ef6ea59ad7bcc55d56502e47c0e736f8b9f990586f2b1edc.png",
                            "background_color": null
                        }
                    ],
                    "tables": [],
                    "figures": [],
                    "graphics": []
                }
            }
        ]
    }
}