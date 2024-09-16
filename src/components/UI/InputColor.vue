<template>
    <div class="input-color" :class="{'reverce' : reverse}" @click="showPicket">
        <div class="color" :style="{background:rgbToHex(modelValue)}"></div>
        <span class="hex">{{ hexWithoutSharp }}</span>
        <div class="select-color-block" v-if="isShowPicket" @click.stop>
            <ColorPicker
                :pure-color="rgbToHex(modelValue)"
                :disable-alpha="true"
                :format="'hex'"
                :theme="'black'"
                :is-widget="true"
                :disable-history="true"
                @update:pure-color="(e)=> emit('changeColor', e)"
            >
                <template v-slot="">
                    <div class="div">dedewdew</div>
                </template>
            </ColorPicker>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import "@/assets/colorPicketCustomStyles.css";

import { type RGBcolor } from "@/types/Presentation";

import { useColor } from "@/composables/useColor";
import { computed, ref } from "vue";

const { hexToRgb, rgbToHex } = useColor()

const props = defineProps<{
    modelValue : RGBcolor
    reverse ?: boolean
}>()

const emit = defineEmits<{
    (event:'changeColor', rgb : string) : void
}>()

const hexWithoutSharp = computed( () => rgbToHex(props.modelValue).substring(1,7) )
    
const isShowPicket = ref<boolean>(false)

function showPicket() {
    isShowPicket.value = ! isShowPicket.value
    if (isShowPicket.value == true) {
        document.addEventListener('click', function(){
            isShowPicket.value = false
        }, {once:true})
    }
}

</script>

<style scoped>
.select-color-block{
    position: absolute !important;
    top: calc(100% + 8px);
    left: 0;
    border-radius: var(--radius-common);
    background: var(--color-background-soft);
    box-shadow: var(--context-shadow);
    overflow: hidden;
}
.input-color{
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}
.input-color.reverce{
    flex-direction: row-reverse;
}
.hex{
    font-weight: 600;
    text-transform: uppercase;
}
.color{
    width: 24px;
    height: 24px;
    border-radius: 5px;
}

</style>