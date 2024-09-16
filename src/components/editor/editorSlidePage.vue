<script setup lang="ts">
import { computed, ref, onMounted, type CSSProperties } from 'vue';
import { type PresThemeOptions, type Slide } from "@/types/Presentation";


import textBox from '@/components/editor/textBox.vue';

import pictureBox from '@/components/editor/pictureBox.vue';
import tableBox from '@/components/editor/tableBox.vue';

import { usePresentationStore } from "@/stores/presentation";

const { 
    resizeStyleByCoefficient, 
    addUrlToPictureBox
} = usePresentationStore()

interface Props {
    presentationStyle : CSSProperties,

    projectThemeProperties : PresThemeOptions,

    slide : Slide,
    scaleCoefficient : number,
    editable ?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'slideContext', event : MouseEvent) : void
}>()

const commonStyle   = computed((): CSSProperties  => resizeStyleByCoefficient(props.presentationStyle, props.scaleCoefficient) )

const slidePage = ref<any>(null)
const pageLoaded = ref<boolean>(false)

onMounted(()=>{
    pageLoaded.value = true
})

</script>

<template>
    <div class="slide-page" 
        :style="commonStyle" 
        v-if="pageLoaded" 
        id="slide-page" 
        ref="slidePage"
        @contextmenu.self.prevent="emit('slideContext', $event)"
    >

        <template v-if="pageLoaded">


            <template v-if="slide.content.textboxes">
                <text-box
                    v-for="(textbox, index) in slide.content.textboxes" 
                    :key="'tb' + Math.floor(Math.random() * 100000) + index"
                    :class="{ 'empty' : !textbox.text }"

                    :box-index="index"
                    :slide-index="slide.index"
                    :scale-coefficient="scaleCoefficient"
                    :editable="true"
                    
                    :text-box-object="textbox"
                    :text-content="textbox.text"
                    :project-theme="projectThemeProperties"
                />
            </template>

            <template v-if="slide.content.pictures">
                <picture-box 
                    v-for="(picture, index) in slide.content.pictures" 
                    :key="'pb'+ Math.floor(Math.random() * 100000) +index"
                    :class="{ 'empty' : !picture.url }"

                    :box-index="index"
                    :slide-index="slide.index"
                    :scale-coefficient="scaleCoefficient"
                    :editable="true"
                    
                    :picture-box-object="picture"
                    @add-image-from-device="(url) => addUrlToPictureBox(url.replace(), slide.index, index)"
                />

            </template>

            
            <template v-if="slide.content.tables">
                <table-box
                    v-for="(table, index) in slide.content.tables" 
                    :key="'tbl'+ Math.floor(Math.random() * 100000) + index"
                    :class="{ 'empty' : !table }"

                    :slide-index="slide.index"
                    :box-index="index"
                    :scale-coefficient="scaleCoefficient"
                    :editable="true"

                    :table-box-object="table"
                />
            </template>

        </template>
    </div>
</template>

<style scoped>

#slide-page {
    position: relative;
    width: 100%;
    height: 100%;
    color: #000000;
    border-radius: var(--radius-xl);
    /* overflow: hidden; */
}

.slide-page * {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
}
</style>
