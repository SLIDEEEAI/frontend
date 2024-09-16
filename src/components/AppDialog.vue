<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
// import { VueDraggable } from 'vue-draggable-plus'
import { useNotificationStore } from '@/stores/notification';
import { useDialogStore } from '@/stores/dialog';
import { storeToRefs } from 'pinia';

import ThemeStep from './dialog/steps/ThemeStep.vue';
import SlidesNumStep from './dialog/steps/SlidesNumStep.vue';
import CreationTypeStep from './dialog/steps/CreationTypeStep.vue';
import ImagesAiStep from './dialog/steps/ImagesAiStep.vue';

import HeadtitlesStep from './dialog/steps/HeadtitlesStep.vue';

import type { ProjectCreationType } from '@/types/dialog/ProjectCreationType';
import type { ImageSource } from '@/types/dialog/ImageSource';


import IconGapDown from "@/components/icons/IconGapDown.vue";
import LoadingIconBlock from '@/components/icons/LoadingIconBlock.vue';
// import HeadtitleItem from '@/components/workspace/dialog/HeadtitleItem.vue';


const { showNotification } = useNotificationStore();
const dialogStore = useDialogStore();

const { isDialog } = storeToRefs(dialogStore)
const { hideDialog } = dialogStore


// const aiTheme = ref<string>('')
// const slidesNum = ref<number>(0)
// const creationType = ref<ProjectCreationType | null>(null)
// const imageSource = ref<ImageSource | null>(null)

const loading = ref<boolean>(false)

const step = ref<number>(1)

const headtitles = ref<string[]>([])

import type { Nullable } from '@/types/tools/Nullable';

export interface DialogState {
    theme : string,
    slidesNum : number,
    creationType : Nullable<ProjectCreationType>,
    imageSource : Nullable<ImageSource>
}

const dialogState = reactive<DialogState>({
    theme : '',
    slidesNum : 0,
    creationType : null,
    imageSource : null,
})


import { generateThemes } from "@/api/generateThemes";


// const sleep = async (ms : number) => new Promise<void>((resolve) => {
//     setTimeout(() => {
//         resolve()
//     }, ms);
// })


// function startByEnter(ev : KeyboardEvent) {
//     console.log('Enter');
    
//     if (ev.key == 'Enter') {
//         genPresentation()
//         document.removeEventListener( 'keydown', startByEnter)
//     }
    
// }

// watch(step.value ,()=>{
//     if (step.value == 2) {
//         document.addEventListener( 'keydown', startByEnter )
//     }
//     else{
//         document.removeEventListener( 'keydown', startByEnter)
//     }
// })

const chatWrap = ref<HTMLDivElement>()

const dialogInput = ref<HTMLInputElement>()
const inputVal = ref<string>('')
const inputStep = ref(step.value)
const inputPlaceholderText = (step : number) => {
    switch (step) {
        case 1:
            return ' Введите тему вашей презентации';
        case 2:
            return ' Введите колличество нужных слайдов';
        default:
            return ' Выберите вариант';
    }
}
const isInputDisabled = ( step : number ) => {
    if ( [1,2].includes(step) ) 
        return false
    return true
    
}

function chatScrollToBottom() {
    setTimeout(() => {
        if (chatWrap.value) {
            chatWrap.value.scrollTo({behavior : 'smooth', top : chatWrap.value.scrollHeight})
        }
    }, 100);
}

function validateStep(step : number) {
    
    if (step == 1) {
        if (!inputVal.value) {
            showNotification('Введите тему проекта')
            return false
        }
        dialogState.theme = inputVal.value
    }

    if (step == 2) {
        if (!inputVal.value) {
            showNotification('Введите количество слайдов')
            return false
        }
        try {
            dialogState.slidesNum = Number(inputVal.value)
        } catch (error) {
            showNotification('Введите число')
            return false
        }
    }

    return true

}


// const headtitlesStep = async () => {
//     if (dialogState.theme.length) {
//         loading.value = true

//         console.log('генерим заголовки');
//         const result = await generateThemes( dialogState.theme, dialogState.slidesNum ) 

//         if (!result) {
//             loading.value = false
//             showNotification('Что-то пошло не так')
//             console.log(result);
//             return
//         }
        
//         headtitles.value = result.themes;
        
//         console.log(result);
//         step.value = 5
//         loading.value = false
//     }
//     else{
//         showNotification('Введите тему')
//     }
// }

const genHeadtitles = async () => {
    // loading.value = true
    const result = await generateThemes( dialogState.theme, dialogState.slidesNum ) 
    if (!result) {
        showNotification('Что-то пошло не так')
        return
    }
    headtitles.value = result.themes;
    // loading.value = false
}

function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const loadingLine = ref(false)
const loadingProgress = ref(0)

async function startLoading() {
    if (chatWrap.value) {
        chatWrap.value.classList.add('loading-hidden');
    }
    await sleep(200)
    loadingLine.value = true
    await sleep(800)
    loadingProgress.value = 80
    await genHeadtitles()
    loadingProgress.value = 100
    await sleep(800)
    if (chatWrap.value) {
        chatWrap.value.classList.remove('loading-hidden');
    }
}

function nextStep(selected : 0|1|2|3|4 = 0) {

    // if (selected) {
    //     console.log('переход на шаг селектом');
    // }

    if (step.value == 4) {
        console.log('go to headtitle step');
        // step.value++
        // inputStep.value++
        // headtitlesStep()
        startLoading()
        .then(()=>{
            step.value++
            inputStep.value++
        })
        .finally(()=>{
            loadingLine.value = false
            loadingProgress.value = 0
        })
        return
    }

    if ( (selected && selected >= step.value ) || validateStep(selected || step.value) ) {
        step.value++
        inputStep.value++
        chatScrollToBottom()
        inputVal.value = ''
    }
}

const stepBack = () => {
    step.value--
    inputStep.value--
    // headtitles.value = []
}

function editStep(st : number){
    const lastStep = step.value
    step.value = st
    inputStep.value = st
    dialogInput.value?.focus
} 

</script>
<template>

    <transition name="fade">
        <div class="dialog-view" v-show="isDialog" >
            <!-- @mousedown.self="hideDialog" -->
             
            <IconGapDown class="hide-dialog-btn" @click="hideDialog"/>

            <div class="dialog-wrap" :class="{'chat-view' : step <= 4, 'headtitles-view' : step == 5}">

                <div class="loading-overlayer" v-if="loading">
                    <LoadingIconBlock />
                </div>
                
                <div class="chat-wrap" ref="chatWrap" v-if="step < 5">
                    <ThemeStep 
                        id="step1"
                        :theme="dialogState.theme" 
                        @select-theme="(theme) => { dialogState.theme = theme; nextStep(1) }"
                        @edit-theme="editStep(1)"
                    />
                    <SlidesNumStep 
                        id="step2"
                        v-if="step > 1 || dialogState.slidesNum != 0"
                        :num="dialogState.slidesNum" 
                        @select-slides-num="(num) => { dialogState.slidesNum = num; nextStep(2) }"
                        @edit-slides-num="editStep(2)"
                    />
                    <CreationTypeStep 
                        id="step3"
                        v-if="step > 2 || dialogState.creationType !== null"
                        :type="dialogState.creationType" 
                        @select-type="(type) => { dialogState.creationType = type; nextStep(3) }"
                    />
                    <ImagesAiStep 
                        id="step4"
                        v-if="step > 3 || dialogState.imageSource !== null"
                        :image-source="dialogState.imageSource" 
                        @select-image-source="(src) => { dialogState.imageSource = src; nextStep(4) }"
                    />
                </div>


                <div class="ai-theme-input" v-if="step < 5">
                    <input 
                        ref="dialogInput"
                        :type="inputStep == 2 ? 'number' : 'text'" 
                        name="ai-theme" 
                        v-model="inputVal" 
                        :placeholder="inputPlaceholderText(inputStep)" 
                        :disabled="isInputDisabled(inputStep)"
                        @keydown.enter="nextStep()"
                    >
                    <button class="theme-gradient" @click="nextStep()" title="Далее">
                        <img src="@/assets/icons/arrow_right_alt.svg">
                    </button>

                    <div class="loading-line-row" v-if="loadingLine">
                        <div class="loading-line theme-gradient" :style="{width : loadingProgress + '%'}"></div>
                    </div>

                </div>


                <div v-if="step == 5 && headtitles.length">
                    <HeadtitlesStep 
                        :dialog-state="dialogState"
                        :titles="headtitles"
                        @step-back="stepBack"
                    />
                </div>


            </div>


            <img class="gradient-pattent" src="@/assets/gradient_line_pattern.svg" @mousedown.self="hideDialog">

        </div>
    </transition>
</template>

<style scoped>
.hide-dialog-btn{
    position: absolute; 
    left: 20px; 
    top: 20px; 
    rotate: 90deg; 
    z-index: 1; 
    cursor: pointer;
}
.dialog-view {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
}
    /* position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10vh;
    background: var(--color-background);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999; */
.dialog-wrap{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 30px;
    background: var(--color-background-op);
    width: 1154px;
    max-height: 682px;
    padding: 40px 65px;
    font-size: 16px;
    z-index: 1;
    overflow: hidden;
    transition: max-height 1s ease;
}
.dialog-wrap.chat-view{
    max-height: 682px;
}
.dialog-wrap.headtitles-view{
    max-height: 800px;
}

.chat-wrap{
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 4px;
    max-height: 100%;
    min-height: 500px;
    overflow-y: auto;
    margin-bottom: 40px;
}
.chat-wrap::-webkit-scrollbar{
    width: 0;
}
.chat-wrap.loading-hidden{
    margin-bottom: 0;
    padding: 0;
    min-height: 0;
    height: 0;
}


.gradient-pattent {
    position: absolute;
    bottom: 8vh;
    width: 100%;
    z-index: 0;
}

.ai-theme-input {
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 56px;
    height: 56px;
    background: var(--color-background);
    border-radius: var(--radius-common);
}

.ai-theme-input>input {
    width: 100%;
    height: 100%;
    padding-left: 32px;
    background: transparent;
    color: var(--color-text);
    font-size: 18px;
    font-weight: 600;
    border: 0;
    outline: 0;
    caret-color: var(--color-accent);
}

.ai-theme-input input::placeholder,
.ai-theme-input input::-moz-placeholder,
.ai-theme-input input::-webkit-input-placeholder {
    color: #535353;
}

.ai-theme-input>button {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    bottom: 0;
    width: 97px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.loading-line-row{
    position: absolute;
    inset: 0;
    background: var(--color-background);
    z-index: 1;
}
.loading-line{
    width: 0;
    height: 100%;
    transition: width 0.8s ease-in-out !important;
}
/* legend {
    margin-bottom: 20px;
}

legend.message {
    position: relative;
    width: fit-content;
    font-size: 18px;
    font-weight: 600;
    width: 412px;
    padding: 15px 18px;
    padding-right: 50px;
    border-radius: var(--radius-common);
    filter: none !important;
}

legend.message::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -7.5px;
    display: block;
    background-image: url(../src/assets/icons/chat-item-pattern.svg);
    width: 29px;
    height: 22px;
} */

.w-60 {
    width: 100%;
    max-width: 60%;
}

.w-75 {
    width: 100%;
    max-width: 70%;
}

/* .examples-pool {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
}

.themes-example_item {
    background-color: var(--color-background-mute);
    padding: 4px 24px;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 400;
    border-radius: var(--radius-xsm);
    cursor: pointer;
    outline: 1px solid transparent;
}

.themes-example_item:hover {
    outline-color: var(--color-accent-light);
} */

.slidesNum-block {
    margin-bottom: 35px;
}


/*  */
.loading-overlayer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000030;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}
.close-dialog-btn {
    position: absolute;
    left: 40px;
    top: 40px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>