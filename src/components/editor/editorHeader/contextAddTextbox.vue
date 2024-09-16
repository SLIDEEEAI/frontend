<template>
    <toolPanelContext :loading="generateLoading">
        
        <div class="gen-text-block">
            <span>Сгенерировать<br> текст AI</span>
            <button class="gen-text-btn theme-gradient" @click="promtAreaShown = true">
                /AI
                <icon-magic :width="28" :height="30"/>
            </button>

            <prompt-area
                :shown="promtAreaShown"
                v-model="promptText"
                @hide="promtAreaShown = false"
                @action="actionGenerate"
            />

        </div>
        
        <div class="splitter"></div>
        
        <span>Добавить текст</span>

        <div class="select-tb-btns">
            <div class="textbox-select-btn" @click.self="addTextboxWithType('h1')" style="font-size: 22px; font-weight: 700;">
                Заголовок 1
                <IconDragRow class="handler"/>
            </div>
            <div class="textbox-select-btn" @click.self="addTextboxWithType('h2')" style="font-size: 18px; font-weight: 700;">
                Заголовок 2
                <IconDragRow class="handler"/>
            </div>
            <div class="textbox-select-btn" @click.self="addTextboxWithType('h3')" style="font-size: 16px; font-weight: 700;">
                Заголовок 3
                <IconDragRow class="handler"/>
            </div>
    
            <div class="textbox-select-btn" @click.self="addTextboxWithType('p')" style="font-size: 16px; font-weight: 500;">
                Основной текст
                <IconDragRow class="handler"/>
            </div>
            <div class="textbox-select-btn" @click.self="addTextboxWithType('s')" style="font-size: 14px; font-weight: 400;">
                Подпись
                <IconDragRow class="handler"/>
            </div>
        </div>

    </toolPanelContext>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import toolPanelContext from './toolPanelContext.vue';
import promptArea from '@/components/UI/promptArea.vue';
import IconDragRow from '@/components/icons/IconDragRow.vue';

import { generateLongText } from "@/api/AI/chatGPT/generateLongText";

import { generateThemeColors } from '@/api/AI/chatGPT/customPrompts';


import { type TextType, type TextBox } from "@/types/Presentation";

import { usePresentationStore } from '@/stores/presentation';
const { activeSlideIndex, addEmptyTextbox, changeTextboxContent } = usePresentationStore()

const emit = defineEmits<{
    (event : 'hide') : void
}>()

const generateLoading = ref<boolean>(false)
const promtAreaShown = ref<boolean>(false)
const promptText = ref<string>('')

function addTextboxWithType(type : TextType, text ?: string) {
    
    const newTextbox : TextBox = {
        type : type,
        width : '400px',
        height : '150px',
        top : '40px',
        left : '40px',
        align : null,
        italic : null,
        bold : null,
        font_size : null,
        background_color : null,
        text : text || '',
        underline : null,
        lineThrough : null,
        color : null
    }
    
    emit('hide')
    const tbIndex = addEmptyTextbox(activeSlideIndex, newTextbox)
    return tbIndex

}

async function actionGenerate() {
    generateLoading.value = true
    try {
        
        // console.log('чек цвета');
        // const result = await generateThemeColors(promptText.value)
        // console.log(result);
        
        const result = await generateLongText(promptText.value)
        if (result) {
            
            console.log(result.long_text);
            
            const tbIndex = addTextboxWithType('p')

            if (tbIndex) 
                changeTextboxContent(result.long_text, activeSlideIndex, tbIndex)
        }
    } 
    catch (err) {
        console.error(err);
    }
    finally {
        generateLoading.value = false
    }
}

</script>

<style scoped>


.gen-text-block{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.select-tb-btns{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.textbox-select-btn{
    position: relative;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    background: var(--color-background);
    border-radius: var(--radius-xsm);
    box-shadow: 0px 6px 0.9px -4px rgba(88, 88, 88, 0.58);
    user-select: none;
    cursor: pointer;
}
.handler{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    margin-right: 8px;
    cursor: grab;
}
.handler:active{
    cursor: grabbing;
}

.gen-text-btn{
    font-size: 20px;
    font-weight: 700;
    height: 48px;
    padding-right: 16px;
    padding-left: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-common);
}
</style>