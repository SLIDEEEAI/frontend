<template>
    <!-- <div style="font-size: 16px;"> -->
    <contentBox
      :box-index="boxIndex"
      :slide-index="slideIndex"
      :scale-coefficient="scaleCoefficient"

      :content-type="'TextBox'"
      :params="contentBlockState"
      @contextmenu.prevent="context.open($event)"

      :class="{'z-top': context.show.value}"
    >
      <!-- style="background: #0000001f;" -->

      <!-- <pre :style="blockCSS">
          {{ blockCSS }}
      </pre> -->
    
      
      <div class="placeholder" v-if="textBoxObject.text == '' && showPlaceholder">Введите текст...</div>

        <div class="content-box text-box" 
          :style="blockCSS"
          @focusin="saveText(newText = '')"
          @input="inputText($event)"
          @focusout="saveText(newText)"
          :contenteditable="editable"
          ref="textboxContent"
        >

        <!-- v-select -->
          <div 
          class="text-box-content" 

            v-for="(paragraph, index) in textContentDivs" :key="index"
          >
              {{ paragraph }}
          </div>   

        </div>

      <template v-if="editable">
        <textBoxEditPanel 
            v-if="context.show.value" 
            @hide="updateTextBox(slideIndex, boxIndex, getResultTextBox())"
            @update="(newState) => updateStyleState(newState)"

            :style="context.positionCSS()"
            :box-index="boxIndex"
            :slide-index="slideIndex"
            :state-params="styleState"
        />
      </template>

    </contentBox>

    <!-- </div> -->
  </template>

<script lang="ts" setup>

import { ref, computed, reactive, type CSSProperties} from 'vue';
import { usePresentationStore } from "@/stores/presentation";
import type { AlignType, PresThemeOptions, RGBcolor, TextBox, TextType } from '@/types/Presentation';

import textBoxEditPanel from '@/components/editor/textBoxEditPanel.vue';
import contentBox from '@/components/editor/contentBox.vue';
import { useContextState } from '@/composables/context/useContextState';



const { 
    ptToPx,
    getWithoutPx,
    updateTextBox,
    changeTextboxContent,
    // getPresentationTheme
} = usePresentationStore()

const props = defineProps<{
    // textContent : string
    boxIndex : number
    slideIndex : number
    scaleCoefficient : number

    editable ?: boolean,
    
    textBoxObject : TextBox,

    projectTheme : PresThemeOptions
  
}>()
  
const context = useContextState(720, 1)

const textBox = props.textBoxObject;

const textboxContent = ref<any | null>()

const showPlaceholder = ref<boolean>( !props.textBoxObject.text )

const newText = ref<string>(props.textBoxObject.text)

const textBoxKey = ref<number>(Math.floor(Math.random() * 100000))

const contentBlockState = reactive({
    left : getWithoutPx(textBox.left),
    top : getWithoutPx(textBox.top),
    width : getWithoutPx(textBox.width),
    height : getWithoutPx(textBox.height)
})



interface State {
    bold : boolean | null
    italic : boolean | null
    lineThrough : boolean
    underline : boolean
    align : AlignType
    type : TextType | null
    color : RGBcolor | null
    fontSize: number | null
}

const fontSizeByType = () => {
  if (textBox.font_size) 
    return textBox.font_size
  else {
    switch (textBox.type) {
      case 'h1':
        return 44;
      case 'h2':
        return 32;
      case 'h3':
        return 28;
      case 'p':
        return 18;
      case 's':
        return 14;
      case 'l':
        return 18;
      default:
        return 18;
    }
  }
}

const colorByFontTheme = () => {
    if (textBox.color) 
      return textBox.color
    else{
      // const theme = getPresentationTheme()?.font_info
      const theme = props.projectTheme?.font_info
      if (theme) {
        if (textBox.type == 'h1' || textBox.type == 'h2' || textBox.type == 'h3') {
          return theme.titles.color
        }
        return theme.main_texts.color
      }
      return null
    }
}


const styleState = reactive<State>({
    // backgroundColor: textBox.background_color,
    type: textBox.type,
    fontSize: fontSizeByType(),
    bold: textBox.bold,
    italic: textBox.italic,
    align: textBox.align,
    underline: textBox.underline || false,
    lineThrough : textBox.lineThrough || false,
    color : colorByFontTheme() || [0,0,0]
})


const updateStyleState = (newState : State) => {
    styleState.bold = newState.bold
    styleState.italic = newState.italic
    styleState.lineThrough = newState.lineThrough
    styleState.underline = newState.underline
    styleState.align = newState.align
    styleState.type = newState.type
    styleState.color = newState.color || colorByFontTheme()
    styleState.fontSize = newState.fontSize

    blockCSS.value = {
        // "fontSize": styleState.fontSize ? styleState.fontSize * scaleCoefficient * PPICoef + 'px' : 'inherit',
        "fontSize": styleState.fontSize ? ptToPx(styleState.fontSize * props.scaleCoefficient) + 'px' : 'inherit',
        // Кегль 44 примерно равно 54px
        "fontWeight": styleState.bold ? 700 : 'inherit',
        "fontStyle" : styleState.italic ? 'italic' : 'inherit',
        "text-align" : styleState.align || 'inherit',
        "color" : styleState.color ? `rgb(${styleState.color[0]},${styleState.color[1]},${styleState.color[2]})` : 'inherit',
        "textDecoration" : styleState.underline || styleState.lineThrough ? (styleState.lineThrough ? 'line-through' : 'underline') : 'none'
    }
}
// Объект для обновления текстбокса
const getResultTextBox = () : TextBox => { 
    return {
        "left" : contentBlockState.left + 'px',
        "top" : contentBlockState.top + 'px',
        "width" : contentBlockState.width + 'px',
        "height" : contentBlockState.height + 'px',
        "background_color" : textBox.background_color,

        "type" : styleState.type || 'p',
        "text": textBox.text,
        // далее свойства используются в стилях
        "font_size": styleState.fontSize,
        "bold": styleState.bold,
        "italic" : styleState.italic,
        "align" : styleState.align,
        "underline" : styleState.underline,
        "lineThrough" : styleState.lineThrough,
        "color" : styleState.color
    } 
}

const blockCSS = ref<CSSProperties>({
    // "fontSize": styleState.fontSize ? styleState.fontSize * scaleCoefficient * PPICoef + 'px' : 'inherit',
    "fontSize": styleState.fontSize ? ptToPx(styleState.fontSize * props.scaleCoefficient) + 'px' : 'inherit',
    // Кегль 44 примерно равно 54px
    "fontWeight": styleState.bold ? 700 : 'inherit',
    "fontStyle" : styleState.italic ? 'italic' : 'inherit',
    "text-align" : styleState.align || 'inherit',
    "color" : styleState.color ? `rgb(${styleState.color[0]},${styleState.color[1]},${styleState.color[2]})` : 'inherit',
    "textDecoration" : styleState.underline || styleState.lineThrough ? (styleState.lineThrough ? 'line-through' : 'underline') : 'none'
})



const textContentDivs = computed<string[]>(() => {
    const divs = textBox.text.split(/\r?\n/)
    if (divs[0] == '') {
        divs.shift()
    }
    return divs
})


const inputText = (event : any) => {
  newText.value = event.target.innerText || ''
  if (newText.value.replace(/\n/g, '') == '') {
    showPlaceholder.value = true
  }
  else{
    showPlaceholder.value = false
  }
}
const saveText = (text:string) => {
  if (text) {
    let resultText;
    text.length == 1 ? resultText = text.replace(/\n/g, '') : resultText = text
    changeTextboxContent(resultText, props.slideIndex, props.boxIndex)
    textBoxKey.value++
  }
}

</script>

<style scoped>
.z-top{
  z-index: 100;
}
.placeholder{
  position: absolute;
  left: 0;
  top: 0;
  content: 'Введите текст...';
  opacity: .5;
  cursor: text;
  user-select: none;
  z-index: -1;
}

.content-box{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.text-box{
  outline: 2px solid transparent;
  transition: background-color 0.1s, outline-color 0.3s;
  caret-color: var(--color-accent);
}

.resizable.empty .text-box{
  background-color: #00000010;
}

.resizable:hover{
  z-index: 100;
}
.resizable:hover .text-box,
.text-box:focus-visible{
  background-color: #00000010;
  outline-color: var(--color-accent-light);
}
.text-box-content{
    cursor: text;
    caret-color: var(--color-accent);
    
}
.text-box-content::selection {
  background-color: var(--color-accent-op);
  color: #fff;
}

</style>