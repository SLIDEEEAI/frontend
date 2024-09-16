<template>
    <!-- :style="{left: x+'px', top : y+'px'}"  -->
    <div class="textbox-edit-panel" 
        ref="editPanelComponent"
        @click.stop
    >
        <div class="edit-panel-wrap">

            <button class="icon icons-set icons-set-btn text-type icon-context"
                :class="{'active' : textTypeContext || state.type !== null}"
                @click="toggleTypeContext"
            >
                <TypeH1Text v-if="state.type == 'h1'" style="fill:white"/>
                <TypeH2Text v-else-if="state.type == 'h2'" style="fill:white"/>
                <TypeH3Text v-else-if="state.type == 'h3'" style="fill:white"/>
                <TypeMainText v-else-if="state.type == 'p'" style="fill:white"/>
                <TypeSubText v-else-if="state.type == 's'" style="fill:white"/>
                <TypeText v-else/>
                <IconGapDown />
            </button><div class="splitter"></div>

            <button class="icon icons-set icons-set-btn text-color"
                :class="{'active' : textColorContext}"
                @click="toggleColorContext"
            >
                <ColorText :rgb="state.color || undefined"/>
                <IconGapDown />
            </button><div class="splitter"></div>

            <div class="icons-set">
                <button class="icon icon-btn text-style" 
                    :class="{'active' : state.bold}"
                    @click="setBold(!state.bold)"
                >
                    <BoldText/>
                </button>
                <button class="icon icon-btn text-style" 
                    :class="{'active' : state.lineThrough}"
                    @click="setLineThrough(!state.lineThrough)"
                >
                    <lineThroughText />
                </button>
                <button class="icon icon-btn text-style" 
                    :class="{'active' : state.underline}"
                    @click="setUnderline(!state.underline)"
                >
                    <UnderlineText />
                </button>
                <button class="icon icon-btn text-style" 
                    :class="{'active' : state.italic}"
                    @click="setItalic(!state.italic)"
                >
                    <ItalicText />
                </button>
            </div><div class="splitter"></div>

            <div class="icons-set">
                <button class="icon icon-btn text-align" 
                    :class="{'active' : state.align == 'left' || state.align == null}"
                    @click="setAlign('left')"
                >
                    <AlignLeftText/>
                </button>
                <button class="icon icon-btn text-align" 
                    :class="{'active' : state.align == 'center'}"
                    @click="setAlign('center')"
                >
                    <AlignCenterText/>
                </button>
                <button class="icon icon-btn text-align" 
                    :class="{'active' : state.align == 'right'}"
                    @click="setAlign('right')"
                >
                    <AlignRightText/>
                </button>

                
            </div><div class="splitter"></div>

            <button class="icon icons-set icons-set-btn text-list">
                <ListText/>
                <IconGapDown />
            </button><div class="splitter"></div>

            <button class="icon icons-set icons-set-btn text-list">
                <AiText/>
                <AiStarText />
            </button><div class="splitter"></div>

            <div class="icons-set">
                <button class="icon icon-btn text-align">
                    <LinkText/>
                </button>
            </div>

            <!-- контекст -->

            <div class="icon-context-block left text-type-context" v-if="textTypeContext">
                <button class="text-type-btn" 
                    :class="{'active' : state.type == 'h1'}" 
                    @click="setType('h1')"
                    style="font-size: 22px; font-weight: 700;" 
                >
                    <TypeH1Text /> Заголовок 1 <IconGapDone class="gap"/>
                </button>
                <button class="text-type-btn" 
                    :class="{'active' : state.type == 'h2'}" 
                    @click="setType('h2')"
                    style="font-size: 18px; font-weight: 700;" 
                >
                    <TypeH2Text /> Заголовок 2 <IconGapDone class="gap"/>
                </button>
                <button class="text-type-btn" 
                    :class="{'active' : state.type == 'h3'}" 
                    @click="setType('h3')"
                    style="font-size: 16px; font-weight: 700;" 
                >
                    <TypeH3Text /> Заголовок 3 <IconGapDone class="gap"/>
                </button>
                <button class="text-type-btn" 
                    :class="{'active' : state.type == 'p'}" 
                    @click="setType('p')"
                    style="font-size: 16px; font-weight: 500;" 
                >
                    <TypeMainText /> Основной текст <IconGapDone class="gap"/>
                </button>
                <button class="text-type-btn" 
                    :class="{'active' : state.type == 's'}" 
                    @click="setType('s')"
                    style="font-size: 14px; font-weight: 400;" 
                >
                    <TypeSubText /> Подпись <IconGapDone class="gap"/>
                </button>
            </div>
            
            <div class="icon-context-block left text-color-context select-color-block" v-if="textColorContext">
                <!-- <span>Пока не сделал</span> 
                <span>но цвет уже выбирается</span>
                <input 
                    type="color" 
                    :value="state.color ? rgbToHex(state.color) : null"
                    @input="changeColor($event.target)"
                > -->

                <ColorPicker
                    :pure-color="state.color ? rgbToHex(state.color) : null"
                    :disable-alpha="true"
                    :format="'hex'"
                    :theme="'black'"
                    :is-widget="true"
                    :disable-history="true"
                    @update:pure-color="(e : any)=> changeColor(e)"
                    
                />


            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import "@/assets/colorPicketCustomStyles.css";

import { ref, onMounted, onUnmounted, reactive } from 'vue';

import { type Booleanify } from "@/types/tools/Booleanity";
import type { TextType, AlignType, RGBcolor } from "@/types/Presentation";


import IconGapDown from '@/components/icons/IconGapDown.vue';
import IconGapDone from '@/components/icons/IconGapDone.vue';

import TypeText from '@/components/icons/textEditIcons/TypeText.vue';
import TypeH1Text from '@/components/icons/textEditIcons/TypeH1Text.vue';
import TypeH2Text from '@/components/icons/textEditIcons/TypeH2Text.vue';
import TypeH3Text from '@/components/icons/textEditIcons/TypeH3Text.vue';
import TypeMainText from '@/components/icons/textEditIcons/TypeMainText.vue';
import TypeSubText from '@/components/icons/textEditIcons/TypeSubText.vue';
import ColorText from '@/components/icons/textEditIcons/ColorText.vue';

import BoldText from '@/components/icons/textEditIcons/BoldText.vue';
import ItalicText from '@/components/icons/textEditIcons/ItalicText.vue';
import UnderlineText from '@/components/icons/textEditIcons/UnderlineText.vue';
import lineThroughText from '@/components/icons/textEditIcons/lineThroughText.vue';

import AlignLeftText from '@/components/icons/textEditIcons/AlignLeftText.vue';
import AlignCenterText from '@/components/icons/textEditIcons/AlignCenterText.vue';
import AlignRightText from '@/components/icons/textEditIcons/AlignRightText.vue';

import ListText from '@/components/icons/textEditIcons/ListText.vue';
import AiText from '@/components/icons/textEditIcons/AiText.vue';
import AiStarText from '@/components/icons/textEditIcons/AiStarText.vue';
import LinkText from '@/components/icons/textEditIcons/LinkText.vue';

import { useColor } from '@/composables/useColor';

const { rgbToHex, hexToRgb } = useColor()

function changeColor(hex : any) {
    changedStateProperties.color = true
    const rgb = hexToRgb(hex)
    state.color = rgb
    updateTb()
}

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

const props = defineProps<{
    boxIndex : number,
    slideIndex : number,
    stateParams : State
}>()

const emit = defineEmits<{
    (e : 'hide') : void
    (e : 'update', state : State) : void
}>()

const state = reactive<State>({
    bold : props.stateParams.bold,
    italic : props.stateParams.italic,
    underline : props.stateParams.underline,
    lineThrough : props.stateParams.lineThrough,
    align : props.stateParams.align,
    type : props.stateParams.type,
    color : props.stateParams.color,
    fontSize : props.stateParams.fontSize
})


// отслеживание какие свойства были изменены в функции
const changedStateProperties = reactive<Booleanify<Partial<State>>>({
    color : false
})
const updateTb = () => {
    emit('update', state)
}



const textTypeContext = ref<boolean>(false)

const textColorContext = ref<boolean>(false)

const editPanelComponent = ref<HTMLElement | null>(null)


function setType(newtype : TextType){
    if (state.type == newtype) {
        // state.type = null
        return
    }
    state.type = newtype
    switch (newtype) {
        case 'h1':
            state.fontSize = 44
            state.bold = true
            break;
        case 'h2':
            state.fontSize = 32
            state.bold = true
            break;
        case 'h3':
            state.fontSize = 28
            state.bold = true
            break;
        case 'p':
            state.fontSize = 18
            state.bold = false
            break;
        case 's':
            state.fontSize = 14
            state.bold = false
            break;
        case 'l':
            state.fontSize = 18
            state.bold = false
            break;
        default:
            break;
    }
    updateTb()
}
function setAlign(newAlign : AlignType){
    if (state.align == newAlign) {
        state.align = null
        return
    }
    state.align = newAlign
    updateTb()
}

function setBold(val:boolean) {
    state.bold = val
    updateTb()
}
function setItalic(val:boolean) {
    state.italic = val
    updateTb()
}
function setUnderline(val:boolean) {
    state.underline = val
    if(val){
        state.lineThrough = false
    }
    updateTb()
}
function setLineThrough(val:boolean) {
    state.lineThrough = val
    if (val) {
        state.underline = false
    }
    updateTb()
}

function toggleTypeContext() {
    textColorContext.value = false
    textTypeContext.value = !textTypeContext.value
}
function toggleColorContext() {
    textTypeContext.value = false
    textColorContext.value = !textColorContext.value
}

onMounted(() => {
    // window.addEventListener('click', function () {
    //     emit('hide');
    // })
})

onUnmounted(() => {
//   console.log('панель отмонтирована')
    if (!changedStateProperties.color) {
        state.color = null
    }
    updateTb()
    emit('hide')
})
</script>

<style scoped>

@keyframes show{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.textbox-edit-panel{
    position: fixed;
    background: var(--color-background-soft);
    border-radius: var(--radius-common);
    padding: 8px 24px;
    height: fit-content;
    transform: translate3d(8px, calc(-100% - 8px), 10px);
    z-index: 100;
    opacity: 0;
    animation: show 0.2s forwards;
}

.edit-panel-wrap{
    display: flex;
    gap: 8px;
}
.icons-set{
    display: flex;
    gap: 4px;
}
.icon{
    background: transparent;
    padding: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}
.icon svg{
    width: 32px;
    height: 32px;
}
.icon-context-block{
    position: absolute;
    bottom: -8px;
    translate: 0 100%;
    background: var(--color-background-soft);
    border-radius: var(--radius-common);
    overflow: hidden;
    padding: 16px;
    width: 270px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.icon-context-block.left{
    left: 0;
}
.icon-context-block.right{
    right: 0;
}
.text-color-context{
    width: auto;
    padding: 0;
}
.text-type-btn{
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    padding: 8px;
    border-radius: var(--radius-xsm);
    background: transparent;
}
.text-type-btn.active{
    background: var(--color-background);
}
.text-type-btn .gap{
    opacity: 0;
    margin-left: auto;
}
.text-type-btn.active .gap{
    opacity: 1;
}

.splitter{
    width: 2px;
    background: var(--color-background);
}

/* ------------- */
.icon:hover, .icon:focus-visible{
    background: var(--color-background-mute);
}
.icon-btn.active{
    background: var(--color-accent);
}
.icons-set-btn.active{
    background: var(--color-background-mute);
}
</style>