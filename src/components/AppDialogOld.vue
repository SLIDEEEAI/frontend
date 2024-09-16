<script setup lang="ts">
import { ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import { useNotificationStore } from '@/stores/notification';
import { useDialogStore } from '@/stores/dialog';
import { storeToRefs } from 'pinia';


import router from '@/router';

import IconGapDown from "@/components/icons/IconGapDown.vue";
import LoadingIconBlock from '@/components/icons/LoadingIconBlock.vue';
import HeadtitleItem from '@/components/workspace/dialog/HeadtitleItem.vue';

import { generatePresentation } from "@/api/generatePresentation";
import { usePresentationStore } from '@/stores/presentation';

const { showNotification } = useNotificationStore();
const dialogStore = useDialogStore();

const { isDialog } = storeToRefs(dialogStore)
const { hideDialog } = dialogStore

const aiTheme = ref<string>('')
const slidesNum = ref<number>(5)

const loading = ref<boolean>(false)

const step = ref<number>(1)

const headtitles = ref<string[]>([])

const stepBack = () => {
    step.value--
    headtitles.value = []
}

import { generateThemes } from "@/api/generateThemes";

const headtitlesStep = async () => {
    if (aiTheme.value.length) {
        loading.value = true

        console.log('генерим заголовки');
        const result = await generateThemes( aiTheme.value, slidesNum.value ) 

        if (!result) {
            loading.value = false
            showNotification('Что-то пошло не так')
            console.log(result);
            return
        }
        headtitles.value = result.themes;
        console.log(result);
        step.value = 2
        loading.value = false
    }
    else{
        showNotification('Введите тему')
    }
}

const sleep = async (ms : number) => new Promise<void>((resolve) => {
    setTimeout(() => {
        resolve()
    }, ms);
})

const genPresentation = async () => {

    if (headtitles.value.every(h => h.length != 0)) {
        loading.value = true
        showNotification('Создаём презентацию', 'success')
    
        // const result = await generatePresentation(headtitles.value)
    
        await sleep(2500)

        console.log('ответ от генерации презы');
        // if (result) {
            // usePresentationStore().setPresentation(result)
            stepBack()
            // router.push({path:'/editor/'+result.id})
        // }        
        // else{
            // console.log('преза пустая');
        // }
        loading.value = false
    }
    else{
        showNotification('Присутствуют пустые заголовки!<br>Отредактируйте или удалите их', 'warning')
    }

    
}

const selectGeneratedTheme = (target : any) => aiTheme.value = target.innerText;

const changeHeadtitle = (newText : string, index : number) => headtitles.value[index] = newText

const addHeadtitle = () => headtitles.value.push('')

const removeHeadtitle = (index : number) => headtitles.value.splice(index, 1)

function startByEnter(ev : KeyboardEvent) {
    console.log('Enter');
    
    if (ev.key == 'Enter') {
        genPresentation()
        document.removeEventListener( 'keydown', startByEnter)
    }
    
}

watch(step,()=>{
    if (step.value == 2) {
        document.addEventListener( 'keydown', startByEnter )
    }
    else{
        document.removeEventListener( 'keydown', startByEnter)
    }
})

</script>
<template>

    <transition name="fade">
        <div class="dialog-view" v-show="isDialog" @mousedown.self="hideDialog">

            <IconGapDown @click="hideDialog" style="position: absolute; left: 20px; top: 20px; rotate: 90deg; z-index: 1; cursor: pointer;"/>

            <div class="dialog-wrap">

                <div class="loading-overlayer" v-if="loading">
                    <LoadingIconBlock />
                </div>
                
                <div class="dialog-step step-1" v-show="step == 1">
    
                    <div class="chat-wrap">
                        <legend class="message theme-gradient">Напишите тему вашей презентации</legend>
                        <div class="examples-pool theme-examples w-60" style="margin-bottom: 80px;">
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Лучшие машины 2023 года</div>
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Теория заговора 1842г</div>
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Восстание ведьм в Париже во времена испанской чумы</div>
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Птицы Азии</div>
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Искусство Австралии</div>
                            <div class="themes-example_item theme-example" @click="selectGeneratedTheme($event.target)">Жители Тулы и области</div>
                        </div>
                        <legend class="message theme-gradient">Выберите количество слайдов или напишите свой вариант</legend>
                        <div class="examples-pool slides-num-examples w-60" style="margin-bottom: 40px;">
                            <div class="themes-example_item slides-num-example">5</div>
                            <div class="themes-example_item slides-num-example">10</div>
                            <div class="themes-example_item slides-num-example">15</div>
                            <div class="themes-example_item slides-num-example">20</div>
                        </div>
                        <div class="slidesNum-block w-75">
                            <ui-input-range :min="1" :max="10" :modelValue="slidesNum" :title="'Слайдов'"
                                @update:modelValue="(val: number) => slidesNum = val" />
                        </div>
                    </div>
                    <div class="ai-theme-input">
                        <input type="text" name="ai-theme" v-model="aiTheme" placeholder=" Введите тему вашей презентации">
                        <button class="theme-gradient" @click="headtitlesStep()">
                            <img src="@/assets/icons/arrow_right_alt.svg">
                        </button>
                    </div>
                </div>
    



                <div class="dialog-step step-2" v-show="step == 2">
                    
                    <div class="step2-theme">
                        <img src="@/assets/icons/back_arrow_btn.svg" @click="stepBack()">
                        <div>
                            <span>Заголовок презентации</span>
                            <h3>{{ aiTheme }}</h3>
                        </div>
                    </div>
    
                    <div class="step2-headtitles">
                        <span style="margin-bottom: 0;">Темы слайдов</span>

                        <VueDraggable
                            v-model="headtitles"
                            class="headtitles-wrap"
                            :animation="650"
                            handle=".handle"
                        >
                        <!-- убрал, потому что из-за кривого индекса слетала v-model -->
                        <!-- :key="'ht'+Math.round(Math.random())+index"  -->
                            <headtitle-item 
                                v-for="(title, index) in headtitles" 
                                :key="index" 
                                :title-text="title"
                                :index="index"
                                @change-headtitle="(text) => changeHeadtitle(text, index)"
                                @remove-headtitle="(index)=>removeHeadtitle(index)"
                            />
                        </VueDraggable>


                        <button @click="addHeadtitle">Добавить</button>

                    </div>
    
                    <div class="step2-bottom">
                        <ui-button 
                            style="background: var(--color-background); color: var(--color-text-dim);"
                            @click="headtitlesStep()"
                        >
                            <img src="@/assets/icons/Autorenew.svg" alt="">
                            Новые заголовки
                        </ui-button>
                        <ui-button 
                        class="theme-gradient"
                        @click="genPresentation"
                        >
                            Создать презентацию
                        </ui-button>
                    </div>
                    
                </div>
            </div>


            <img class="gradient-pattent" src="@/assets/gradient_line_pattern.svg" @mousedown.self="hideDialog">

        </div>
    </transition>
</template>

<style scoped>
.dialog-view {
    position: fixed;
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
    z-index: 999;
}
.dialog-wrap{
    position: relative;
}
.dialog-step {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    background: var(--color-background-op);
    width: 1154px;
    min-height: 682px;
    padding: 40px 65px;
    font-size: 16px;
    z-index: 1;
    overflow: hidden;
}
.dialog-wrap.step-1{
    justify-content: space-between;
}
.dialog-wrap.step-2{
    gap: 48px;
}

/* step 2 */

.step2-theme{
    display: flex; 
    align-items: flex-start; 
    gap: 16px;
    margin-bottom: 30px;
}
.step2-theme span, .step2-headtitles > span{
    display: block;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-dim);
}
.step-2 h3{
    font-size: 20px;
    font-weight: 700;
}
.step2-theme img{
    cursor: pointer;
    translate: 0 -5px;
}

.step2-headtitles, .headtitles-wrap{
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;
}
.step2-headtitles{
    height: 600px;
}
.step2-headtitles button{
    background: transparent;
    width: fit-content;
    align-self: flex-end;
    color: var(--color-text-grey);
}


.step2-bottom{
    display: flex;
    justify-content: space-between;
}
.step2-bottom button{
    border-radius: var(--radius-sm);
    height: 50px;
    margin: 0;
    width: auto;
    font-size: 18px;
    font-weight: 600;
    padding: 0px 32px;
}
/* step 2 */

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


legend {
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
}

.w-60 {
    width: 100%;
    max-width: 60%;
}

.w-75 {
    width: 100%;
    max-width: 70%;
}

.examples-pool {
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
}

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