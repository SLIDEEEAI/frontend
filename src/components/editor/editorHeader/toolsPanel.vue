<template>
    <div class="header-tools-panel">

        <div class="tools-panel-item">
            <button class="tool-btn action-return" ref="actionReturnBtn" @click="console.log('назад'); historyActionReturn()">
                <actionReturn />
            </button>
        </div>

        <div class="tools-panel-item">
            <button class="tool-btn action-ahead" ref="actionAheadBtn" @click="console.log('Вперёд')">
                <actionAhead />
            </button>
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn add-textbox" @click.stop="updateContext('addTextboxContext')">
                <fieldText />
            </button>
            <context-add-textbox
                v-if="state.addTextboxContext"
                @hide="state.addTextboxContext = false"
            />
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn add-picturebox" @click.stop="updateContext('addPictureContext')">
                <fieldImg />
            </button>
            <context-add-picture
                v-if="state.addPictureContext"
                @hide="state.addPictureContext = false"
            />
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn">
                <fieldGraphic />
            </button>
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn">
                <fieldFigure />
            </button>
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn add-tablebox" @click.stop="updateContext('addTableContext')">
                <fieldTable />
            </button>
            <contextAddTable
                v-if="state.addTableContext"
                @hide="state.addTableContext = false"
            />
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn" @click.stop="updateContext('presentationThemeContext')">
                <fieldStyle />
            </button>
            <context-edit-theme 
                v-if="state.presentationThemeContext"
                @hide="state.presentationThemeContext = false"
            />
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn add-slide" @click.stop="updateContext('addSlideContext')">
                <fieldSlide />
            </button>
            <context-add-slide 
                v-if="state.addSlideContext"
                @add-template="(tempName) => addSlideTemplate(tempName)"
            />
        </div>

        <div class="splitter"></div>

        <div class="tools-panel-item">
            <button class="tool-btn notice-btn hasNotice">
                <fieldNotice />
            </button>
        </div>

    </div>
</template>

<script lang="ts" setup>

import actionReturn from '@/components/icons/editorControlPanel/actionReturn.vue';
import actionAhead from '@/components/icons/editorControlPanel/actionAhead.vue';
import fieldText from '@/components/icons/editorControlPanel/fieldText.vue';
import fieldImg from '@/components/icons/editorControlPanel/fieldImg.vue';
import fieldGraphic from '@/components/icons/editorControlPanel/fieldGraphic.vue';
import fieldFigure from '@/components/icons/editorControlPanel/fieldFigure.vue';
import fieldTable from '@/components/icons/editorControlPanel/fieldTable.vue';
import fieldStyle from '@/components/icons/editorControlPanel/fieldStyle.vue';
import fieldSlide from '@/components/icons/editorControlPanel/fieldSlide.vue';
import fieldNotice from '@/components/icons/editorControlPanel/fieldNotice.vue';

import contextAddTextbox from './contextAddTextbox.vue';
import contextAddPicture from './contextAddPicture.vue';
import contextAddTable from './contextAddTable.vue';
import contextAddSlide from './contextAddSlide.vue';
import contextEditTheme from './contextEditTheme.vue';


import type { TemplateName } from '@/stores/templates/types/slideTemplate';
import { usePresentationStore } from "@/stores/presentation";
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, reactive, ref } from 'vue';

const presentationStore = usePresentationStore()

const { 
    addEmptySlide,
    fillSlideByTemplate,
    historyActionReturn
} = presentationStore

const { activeSlideIndex } = storeToRefs(presentationStore)

function addSlideTemplate(template:TemplateName) {
    const index = addEmptySlide()
    console.log(index, template)
    if (index) {
        fillSlideByTemplate(template, index)
        activeSlideIndex.value = index
    }
}

const state = reactive({
    addTextboxContext : false,
    addPictureContext : false,
    addGraphicContext : false,
    addFigureContext : false,
    addTableContext : false,
    addSlideContext : false,
    presentationThemeContext : false,
    notifications : false
})
const stateKeys = Object.keys(state);


function updateContext(context: keyof typeof state): void {
    if (state[context]) {
        state[context] = false
        return
    }
    for (const key of stateKeys) {
        if (key === context) {
        state[key as keyof typeof state] = true
        } else {
        state[key as keyof typeof state] = false
        }
    }
    function hideAllContext() {
        for (const key of stateKeys) {
            state[key as keyof typeof state] = false
        }
    }
    window.addEventListener('click', hideAllContext)
    window.addEventListener('contextmenu', hideAllContext)
}

const actionReturnBtn = ref<HTMLButtonElement>()
const actionAheadBtn = ref<HTMLButtonElement>()


const keyupHandler = (event : KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'z') {
        undoHandler()
    }
    else if (event.ctrlKey && event.key === 'y') {
        redoHandler()
    }
}
const undoHandler = () => {
actionReturnBtn.value?.click()
}
const redoHandler = () => {
actionAheadBtn.value?.click()
}

onMounted(() => {
    document.addEventListener('keyup', keyupHandler)
})
onUnmounted(() => {
    document.removeEventListener('keyup', keyupHandler)
})
</script>

<style scoped>

.header-tools-panel{
    border-radius: 15px;
    background: #222525;
    padding: 7px 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
}
.tools-panel-item{
    position: relative;
    display: flex;
    justify-content: center;
}
.header-tools-panel .splitter{
    background: #1A1D1D;
    width: 2px;
    height: 32px;
    /* stroke-width: 2px;
    stroke: #1A1D1D; */
}
.tool-btn{
    background: transparent;
    height: fit-content;
    width: 32px;
    height: 32px;
    padding: 0;
    outline: 2px solid transparent;
    border-radius: var(--radius-xsm);
    transition: all 0.2s;
}
.tool-btn img{
    transition: filter 0.2s;
}
.tool-btn:hover{
    background: var(--color-background-mute) !important;
}
.tool-btn:hover img{
    filter: brightness(2);
    /* outline-color: var(--color-accent-light);
    background: var(--color-background-mute) !important;
    background: var(--color-text-grey) !important; */
}

.tool-btn img{
    height: 100%;
    width: auto;
}

/*  */

/* .tools-panel-item-context{
    position: absolute;
    top: calc(100% + 16px);
    width: 334px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
    border-radius: var(--radius-common);
    background: var(--color-background-soft);
    box-shadow: var(--context-shadow);
    z-index: 100;
} */
/* .tools-panel-item-context .splitter{
    width: 100%;
    height: 2px;
    background: var(--color-background);
} */

.slide-templates{
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
.slide-templates-item{
    cursor: pointer;
}

</style>