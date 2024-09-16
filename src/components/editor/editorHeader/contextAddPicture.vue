<template>
    <toolPanelContext :loading="generateLoading">
        <div class="gen-picture-block">
            <span>Сгенерировать<br> изображение AI</span>
            <button class="gen-picture-btn theme-gradient" @click="promtAreaShown = true">
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

        <button class="load-picture-btn">
            Загрузить
            <IconLoad/>
            <input type="file" @change="addImageFromDevice($event)">
        </button>
    </toolPanelContext>
</template>

<script lang="ts" setup>
import toolPanelContext from './toolPanelContext.vue';
import IconLoad from '@/components/icons/IconLoad.vue';
import promptArea from '@/components/UI/promptArea.vue';

import { generateImage } from "@/api/AI/generateImage";
// import { type PictureBox, type PictureSourceType } from "@/types/Presentation";

import { usePresentationStore } from '@/stores/presentation';
import { ref } from 'vue';
const { activeSlideIndex, addEmptyPictureBox, addUrlToPictureBox } = usePresentationStore()

const emit = defineEmits<{
    (event : 'hide') : void
}>()


const generateLoading = ref<boolean>(false)
const promtAreaShown = ref<boolean>(false)
const promptText = ref<string>('')

async function actionGenerate() {
    generateLoading.value = true
    try {
        const result = await generateImage(promptText.value)
        
        if (result) {
            console.log(result.images);
            
            // const pictureIndex = 
            addEmptyPictureBox(activeSlideIndex, {
                type : 'localSrc',
                url : result.images[0].url
            })

            // if (pictureIndex) 
                // addUrlToPictureBox(result.images[0].url, activeSlideIndex, pictureIndex)
        }
    } 
    catch (err) {
        console.error(err);
    }
    finally {
        generateLoading.value = false
    }
}

const handleFileLoad = (event: ProgressEvent<FileReader>) => {
  const result = event.target?.result as string;
  addEmptyPictureBox(activeSlideIndex, {
    width: '600px',
    height: '600px',
    top: '40px',
    left: '1280px',
    background_color: null,
    type: 'data',
    url: result,
  });
  console.log(result);
};

const addImageFromDevice = async (event: any) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = handleFileLoad;
    reader.readAsDataURL(file);
  }
};


</script>

<style scoped>

.gen-picture-block{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.gen-picture-btn{
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
.load-picture-btn{
    position: relative;
    display: flex;
    justify-content: center;
    gap: 7px;
    padding: 17px;
    border-radius: var(--radius-xsm);
    background: var(--color-background);
    font-size: 16px;
    font-weight: 600;
    color: var(--c-text-white-dim);
}
.load-picture-btn > input{
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
}
</style>