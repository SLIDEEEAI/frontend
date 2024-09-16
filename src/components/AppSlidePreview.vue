<script setup lang="ts">
import { onMounted, ref, type CSSProperties } from 'vue';
import { type PresThemeOptions, type Slide } from "@/types/Presentation";

import textBox from '@/components/editor/textBox.vue';
import pictureBox from '@/components/editor/pictureBox.vue';
import tableBox from '@/components/editor/tableBox.vue';

import { usePresentationStore } from "@/stores/presentation";

const { resizeStyleByCoefficient, parsePresentationTheme } = usePresentationStore()

const props = defineProps<{
    previewStyle: CSSProperties,

    projectThemeProperties : PresThemeOptions,

    slide: Slide,
    scaleCoefficient: number,
    editable ?: boolean
}>()

const isMinimized = ref<boolean>(false)

const preview = ref<HTMLElement | null>(null)


const globalStyles = resizeStyleByCoefficient(parsePresentationTheme(props.projectThemeProperties), props.scaleCoefficient)


onMounted(() => {
    if ( preview.value && preview.value.clientWidth < 450 ) {
        isMinimized.value = true
    }
    
})

</script>

<template>
    <div class="slide-preview" 
        v-if="globalStyles"
        :class="{ 'minimized' : isMinimized }" 
        :style="globalStyles" 
        ref="preview"
    >

        <!-- <text-box 
            v-for="(textBox, index) in slide.content.textboxes" 
            :key="'tb'+ Math.floor(Math.random() * 100000) + index"
            :hidden="textBox.text == ''"

            :slide-index="1"
            :box-index="index" 
            :scale-coefficient="scaleCoefficient"
            
            :text-box-object="textBox"

            :project-theme="projectThemeProperties"
        /> -->

        <template v-if="slide.content.textboxes">
            <text-box
                v-for="(textbox, index) in slide.content.textboxes" 
                :key="'tb' + Math.floor(Math.random() * 100000) + index"
                :class="{ 'empty' : !textbox.text }"

                :box-index="index"
                :slide-index="slide.index"
                :scale-coefficient="scaleCoefficient"
                
                :text-box-object="textbox"
                :project-theme="projectThemeProperties"
            />
        </template>


        <picture-box 
            v-for="(picture, index) in slide.content.pictures" 
            :hidden="!picture.url"
            :key="'pb'+ Math.floor(Math.random() * 100000) + index"

            :slide-index="1"
            :box-index="index"
            :scale-coefficient="scaleCoefficient"
            :editable="editable"
            
            :picture-box-object="picture"
        />

        <table-box
            v-for="(table, index) in slide.content.tables" 
            :hidden="!table"
            :key="'tbl'+ Math.floor(Math.random() * 100000) + index"
            
            :slide-index="1"
            :box-index="index"
            :scale-coefficient="scaleCoefficient"
            :editable="editable"

            :table-box-object="table"
        />

    </div>
</template>

<style>
.slide-preview.minimized th,
.slide-preview.minimized td {
    border: 0 !important;
    padding: 0 !important;
}
</style>

<style scoped>

/* width: 960px;
height: 540px; */
.slide-preview{
    position: relative;
    width: 100%;
    height: 100%;
    color: #000000;
}

.slide-preview *{
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    pointer-events: none;
}

/* .content-box{
    position: absolute;
    display: inline-block;
    border-radius: var(--radius-sm);
    cursor: pointer;
    background: transparent;
    transition: all 0.2s;
}

.picture-box{
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}
.picture-box img{
    width: 100%;
    height: auto;
} */
</style>
