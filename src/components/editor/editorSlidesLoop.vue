<script setup lang="ts">
import { onMounted, ref, watch, type CSSProperties } from "vue";
import { type Slide } from "@/types/Presentation";
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus'

import AppSlidePreview from "@/components/AppSlidePreview.vue";
import IconPlus from '@/components/icons/IconPlus.vue'

import { usePresentationStore } from '@/stores/presentation'
import { storeToRefs } from "pinia";

const presentationStore = usePresentationStore()

const { activePresentation, activeSlideIndex } = storeToRefs(presentationStore)
const { 
    addEmptySlide, 
    ifPresentation,
} = presentationStore

defineProps<{
    presentationStyle: CSSProperties,
    slidePreviews: Slide[],
}>()

const loopScaleCoeffcient = ref<number | null>(null)

const emit = defineEmits<{
    (e: 'slideDrag' ) : void,
    (e: 'slideContext', event: MouseEvent, slideIndex : number) : void
}>()

function toggleActiveSlide(slideID: number) {

    activeSlideIndex.value = slideID
}

const addSlide = () => {
    const index = addEmptySlide()
    if (index) 
        setTimeout( function(){ 
            toggleActiveSlide(index)
        }, 100)
}

onMounted( () => {
    const loop = document.getElementById('slidesLoopRef');
    if (loop) {
        loopScaleCoeffcient.value = loop.offsetWidth / 1920
    }
})

function replaceSlide(event : SortableEvent) {
    ifPresentation((pres) => {
        if (event.newIndex !== undefined && event.oldIndex !== undefined) {
            
            pres.slides.forEach((slide, index) => slide.index = index )

            if (event.clone.classList.contains('active')) {
                activeSlideIndex.value = event.newIndex
            }
            else{
                if (event.oldIndex > activeSlideIndex.value && event.newIndex <= activeSlideIndex.value)
                    activeSlideIndex.value++
                else if (event.oldIndex < activeSlideIndex.value && event.newIndex >= activeSlideIndex.value)
                    activeSlideIndex.value--
            }
        }
    })
} 

</script>

<template>
    <div class="slides-loop">

        <VueDraggable 
            v-if="activePresentation"
            class="slides-loop__wrap" 
            id="slidesLoopRef"
            v-model="activePresentation.slides"

            @end="(e) => replaceSlide(e)"

            :animation="150"
        >
            <div 
                v-for="(slide, index) in activePresentation.slides" 
                :key="'slide'+index"
                :data-now-index=index
                draggable="true"
                class="slide-item" 
                :class="{ 'active': index == activeSlideIndex }"
                @click='toggleActiveSlide(index)' 
                @contextmenu.prevent="emit('slideContext', $event, index)"
            >
                <div class="slide-item__number">{{ index + 1 }}</div>
                <div class="slide-item__preview">

                    <app-slide-preview 
                        v-if="loopScaleCoeffcient !== null && presentationStyle && slide"
                        :scale-coefficient="loopScaleCoeffcient"
                        :slide="slide"
                        :preview-style="presentationStyle"
                        :project-theme-properties="activePresentation.theme"
                        :key="Math.floor(Math.random() * 100000)"
                    />

                </div>
            </div>

        </VueDraggable>

        <div class="slides-loop__splitter"></div>

        <button class="w-100 transparent" id="addNewSlideBtn" @click="addSlide">
            <IconPlus />
        </button>

    </div>
</template>

<style scoped>
.slides-loop{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 13px;
    min-width: 138px;
    width: 138px;
    /* width: 960px; */
    height: 90vh;
    max-height: 920px;
    border-radius: 15px;
    background: #222525;
    padding: 12px;
}
.slides-loop__splitter{
    background: var(--color-background);
    height: 2px;
    width: 100%;
    border-radius: 1px;
}
.slides-loop__wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.slide-item{
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--radius-xsm);
    outline: 3px solid transparent;
    transition: outline 0.2s ease-out;
    cursor: pointer;
}
.slide-item.active{
    outline-color: var(--color-border);
}

.slide-item__number{
    position: absolute;
    left: -12px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    padding: 9px 10px;
    height: fit-content;
    font-size: 14px;
    border-radius: 0px 4px 4px 0px;
    background-color: var( --color-background);
    transition: background-color 0.2s ease-out;
    z-index: 2;
}
.slide-item.active .slide-item__number{
   background-color:  var(--color-border);
}
.slide-item__preview{
    /* width: 960px;
    height: 540px; */
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-xsm);
}

#addNewSlideBtn{
    width: 100%;
    padding: 6px;
    transition: background 0.2s;
    border-radius: 4px;
}
#addNewSlideBtn:hover{
    background: var(--color-background-mute);
}
</style>