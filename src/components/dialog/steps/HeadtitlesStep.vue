<template>
    <div class="headtitles-step">
        <img 
            src="@/assets/icons/back_arrow_btn.svg" 
            @click="$emit('stepBack')"
        >
        <div>
            <span>Заголовок презентации</span>
            <h3>{{ dialogState.theme }}</h3>
        </div>
    </div>

    <div class="headtitles-top-panel">
        <span>Темы слайдов</span>
        <button class="add-headtitle-btn" @click="addHeadtitle">Добавить</button>
    </div>
    
    <div class="headtitles-wrap">

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

    </div>

    <div class="step2-bottom">
        <ui-button 
            style="background: var(--color-background); color: var(--color-text-dim);"
            @click="genNewHeadtitles"
        >
            <img src="@/assets/icons/Autorenew.svg" alt="">
            Новые заголовки
        </ui-button>
        <ui-button 
            class="theme-gradient"
            @click="constructPresentation( dialogState.theme , headtitles)"
        >
            <!-- @click="genPresentation" -->
            Создать презентацию
        </ui-button>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { VueDraggable } from "vue-draggable-plus";
import HeadtitleItem from '../HeadtitleItem.vue';
import type { DialogState } from '@/components/AppDialog.vue';

import { useNotificationStore } from '@/stores/notification';
import { usePresentationStore } from '@/stores/presentation';
import { generateThemes } from '@/api/generateThemes';

const { showNotification } = useNotificationStore()
const { constructPresentation } = usePresentationStore()

const props = defineProps<{
    dialogState : DialogState,
    titles : string[]
}>()

defineEmits<{
    (e : 'genNewHeadtitles') : void
    (e : 'stepBack') : void
}>()

const headtitles = ref<string[]>(props.titles)


const changeHeadtitle = (newText : string, index : number) => headtitles.value[index] = newText

const addHeadtitle = () => headtitles.value.push('')

const removeHeadtitle = (index : number) => headtitles.value.splice(index, 1)

const genNewHeadtitles = async () => {
        const result = await generateThemes( props.dialogState.theme, props.dialogState.slidesNum ) 
        if (!result) {
            showNotification('Что-то пошло не так')
            return
        }
        headtitles.value = result.themes;
}

// const genPresentation = async () => {

//     if (headtitlesArr.value.every(h => h.length != 0)) {
//         loading.value = true
//         showNotification('Создаём презентацию', 'success')

//         // const result = await generatePresentation(headtitles.value)

//         await sleep(2500)

//         console.log('ответ от генерации презы');
//         // if (result) {
//             // usePresentationStore().setPresentation(result)
//             stepBack()
//             // router.push({path:'/editor/'+result.id})
//         // }        
//         // else{
//             // console.log('преза пустая');
//         // }
//         loading.value = false
//     }
//     else{
//         showNotification('Присутствуют пустые заголовки!<br>Отредактируйте или удалите их', 'warning')
//     }
// }


</script>

<style scoped>

/* step 2 */

.headtitles-step{
    display: flex; 
    align-items: flex-start; 
    gap: 16px;
    margin-bottom: 30px;
}
.headtitles-step span, .headtitles-wrap > span{
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
.headtitles-step img{
    cursor: pointer;
    translate: 0 -5px;
}

.headtitles-wrap{
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow: auto;
    height: 478px;
    margin: 16px 0;
    padding: 4px 0;
}

.add-headtitle-btn{
    background: transparent;
    width: fit-content;
    color: var(--color-text-grey);
}

.headtitles-top-panel{
    display: flex;
    justify-content: space-between;
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

</style>