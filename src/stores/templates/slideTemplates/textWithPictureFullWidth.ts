import {
    slidePadding,
    textPadding,
    textGap,
    getSlidePadding,
    topReverce,
    fullWidth,
} from '../tools';

import { type slideTemplate} from '../types/slideTemplate'

export const textWithPictureFullWidthTemplate : slideTemplate = {
    name : 'textWithPictureFW',
    textboxes : [{
        top : getSlidePadding() + textPadding + 'px',
        left : getSlidePadding() + textPadding + 'px',
        width : fullWidth() - 2 * 20 + 'px',
        height : '42px',

        align : 'left',
        bold : true,
        italic : false,
        font_size : 21,
        text : '',
        type : 'h2',
        background_color : null,
        underline : null,
        lineThrough : null,
        color : null
    },
    {
        top : getSlidePadding() + textPadding + textGap + 42 + 'px',
        left : getSlidePadding() + textPadding + 'px',
        width : fullWidth() - 2 * 20 + 'px',
        height : '330px',

        align : 'left',
        bold : false,
        italic : false,
        font_size : 18,
        text : '',
        type : 'p',
        background_color : null,
        underline : null,
        lineThrough : null,
        color : null
    }],
    pictures : [{
        top : topReverce(80, 398)  + 'px',
        left : slidePadding + 'px',
        width : fullWidth() + 'px',
        height : '398px',
        
        background_color : null,
        url : null,
        type : 'data'
    }],
    tables : [],
    figures : [],
    graphics : [],
}

export default textWithPictureFullWidthTemplate