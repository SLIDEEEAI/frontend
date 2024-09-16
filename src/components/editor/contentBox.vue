<template>
    <vue-resizable
      class="resizable"
      ref="resizableComponent"
      :dragSelector="dragSelector"
      :fit-parent="fit"
      :left="left"
      :top="top"
      :width="width"
      :height="height"
      
      @resize:end="resizeOrGrabHandler"
      @drag:end="resizeOrGrabHandler"
    >

    <!-- @mount="eHandler"
      @resize:move="eHandler"
      @resize:start="eHandler"
      @drag:move="eHandler"
      @drag:start="eHandler"  -->
      
      <div class="content-block-btn remove-btn" @click="removeContentBox(slideIndex, boxIndex, contentType)">
        <icon-close />
      </div>
      <div class="content-block-btn drag-btn">
        <icon-drag-row />
      </div>

      
      <slot></slot>
      <div class="loading-layout" v-if="isLoading">
        <LoadingIconBlock :size="14"/>
      </div>
      
  </vue-resizable>

</template>

<script lang="ts" setup>
import VueResizable from 'vue-resizable'
import type { resizedOrGrabedData } from '@/types/Presentation';
import { onMounted, ref } from 'vue';
import LoadingIconBlock from '@/components/icons/LoadingIconBlock.vue';

import { type ContentType } from "@/types/Presentation";
import { usePresentationStore } from "@/stores/presentation";

const {  
  changeBoxSizeAndPosition, 
  removeContentBox }
= usePresentationStore()

interface Params {
  // параметры из бокса прилетают уже без px
    left : number
    top : number
    width : number
    height : number
}

const props = defineProps<{
  params: Params,
  boxIndex : number,
  slideIndex : number,
  contentType : ContentType,
  scaleCoefficient : number,
  isLoading ?: boolean
}>()


const width = ref<number>( props.params.width * props.scaleCoefficient )
const height = ref<number>( props.params.height * props.scaleCoefficient)

const left = ref<number>( props.params.left * props.scaleCoefficient)
const top = ref<number>( props.params.top * props.scaleCoefficient)

const fit = ref<boolean>(false)
const event = ref<string>("")
const dragSelector = ref<string>(".drag-btn")

const resizableComponent = ref<InstanceType<typeof VueResizable> | null>(null)

function resizeOrGrabHandler(newData : resizedOrGrabedData) {
    width.value= newData.width
    height.value = newData.height
    left.value = newData.left
    top.value = newData.top
    event.value = newData.eventName

    changeBoxSizeAndPosition(newData, props.slideIndex, props.contentType, props.boxIndex, props.scaleCoefficient)
}

onMounted(()=>{
    // нужно только для изменения объекта напрямую в коде, изменения через функции store'a работают без watch
    // watch(props, ()=>{
    // width.value = getWithoutPx(props.boxStyle.width || 120) 
    // height.value = getWithoutPx(props.boxStyle.height || 120) 
    // left.value = getWithoutPx(props.boxStyle.left || 100) 
    // top.value = getWithoutPx(props.boxStyle.top || 100) 
    // })
})
</script>

<style scoped>

.loading-layout{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000020;
}
.resizable {
  background-position: top left;
  padding: 0;
  font-weight: normal;
  position: absolute !important;
  will-change: left, top;
  z-index: 1;
}
.content-block-btn{
  height: 26px;
  width: 26px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0;
  background-color: #00000020;
  transition: opacity 0.3s;
  z-index: 999;
}
.drag-btn{
    right: 0;
    top: 0;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
}
.remove-btn{
    position: absolute;
    top: 0;
    right: 40px;
    cursor: pointer;
}
.resizable:hover .content-block-btn{
  opacity: 1;
}
.drag-btn:active, .drag-btn:focus{
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}

</style>