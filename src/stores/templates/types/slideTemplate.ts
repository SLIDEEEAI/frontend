import type { TextBox, PictureBox , TableBox, FigureBox, GraphicBox} from '@/types/Presentation'

export type TemplateName = 'common' | 'textFW' | 'textWithPictureFW'

export interface slideTemplate{
    name : TemplateName,
    textboxes : TextBox[],
    pictures : PictureBox[],
    tables : TableBox[],
    figures : FigureBox[],
    graphics : GraphicBox[],
}