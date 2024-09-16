import { textGap, getSlidePadding, fullWidth, fullHeightOffset } from '../tools'
import { type slideTemplate } from '../types/slideTemplate'

const textFullWidthTemplate: slideTemplate = {
  name: 'textFW',
  textboxes: [
    {
      top: getSlidePadding() + 'px',
      left: getSlidePadding() + 'px',
      width: fullWidth() + 'px',
      height: '84px',

      align: 'center',
      bold: true,
      italic: false,
      font_size: 42,
      text: '',
      type: 'h2',
      background_color: null,
      underline: null,
      lineThrough: null,
      color: null
    },
    {
      top: getSlidePadding() + 84 + textGap + 'px',
      left: getSlidePadding() + 'px',
      width: fullWidth() + 'px',
      height: fullHeightOffset(getSlidePadding() + 84 + textGap) + 'px',

      align: 'center',
      bold: false,
      italic: false,
      font_size: 18,
      text: '',
      type: 'p',
      background_color: null,
      underline: null,
      lineThrough: null,
      color: null
    }
  ],
  pictures: [],
  tables: [],
  figures: [],
  graphics: []
}
export default textFullWidthTemplate
