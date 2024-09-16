import {
    textPadding,
    textGap,
    getSlidePadding,
    fullHeight,
    fullWidthOffset,
    fullHeightOffset,
} from '../tools';

import { type slideTemplate} from '../types/slideTemplate'

const commonTemplate : slideTemplate = {
    name : 'common',
    textboxes : [{
        top : getSlidePadding() + textPadding + 'px',
        left : getSlidePadding() + textPadding + 'px',
        width : fullWidthOffset(1043) - (2 * textPadding) + 'px',
        height : '60px',

        align : 'left',
        bold : true,
        italic : false,
        font_size : 30,
        text : '',
        type : 'h2',
        background_color : null,
        underline : null,
        lineThrough : null,
        color : null
    },
    {
        top : getSlidePadding() + textPadding + 60 + textGap + 'px',
        left : getSlidePadding() + textPadding + 'px',
        width : fullWidthOffset(1043) - (2 * textPadding) + 'px',
        height : fullHeightOffset(202) - (2 * textPadding) + 'px',

        align : 'left',
        bold : false,
        italic : false,
        font_size : 15,
        text : '',
        type : 'p',
        background_color : null,
        underline : null,
        lineThrough : null,
        color : null
    }],
    pictures : [{
        top : getSlidePadding() + 'px',
        left : '927px',
        width : fullWidthOffset(927) + 'px',
        height : fullHeight() + 'px',

        background_color : null,
        url : null,
        type : 'data'
    }],
    tables : [],
    figures : [],
    graphics : [],
}

export default commonTemplate