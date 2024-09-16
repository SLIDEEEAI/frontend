<template>
    <toolPanelContext>
        <span>Вид презентации</span>
        
        <div class="theme-colors-blocks">
            <!-- <div 
                v-for="theme in themes" :key="theme.name"
                class="select-theme-btn"
                :style="{background : rgbToHex(theme.options.background_color)}"
                @click="setThemeByTemplate(theme.name); 
                emit('hide')"
            >
                <div class="theme-block-pattern" :style="{background : rgbToHex(theme.options.objects_color)}" ></div>
                <span :style="{color : rgbToHex(theme.options.font_info.titles.color || [255,255,255])}">
                    {{ theme.name }}
                </span>
            </div> -->

            <ThemeColorsIcon
                v-for="theme in themes" 
                :key="theme.name"
                :name="theme.name"
                :color1="theme.options.background_color"
                :color2="theme.options.font_info.titles.color || [255,255,255]"
                class="theme-colors-icon"
                :class="{'active' : theme.name == activePresentation?.theme.name}"
                @click="setThemeByTemplateName(theme.name); emit('hide')"
            />
        </div>

        <div class="property-block">
            <span>Цвет фона</span>

            <InputColor
                class="input-bg-color"
                v-model="bgColorRGB"
                :reverse="true"
                @change-color="(hex) => updateBgColor(hex)"
            />
        </div>

        <div class="property-block">
            <span>Заголовки</span>

            <InputColor
                class="input-bg-color"
                v-model="titlesColorRGB"
                :reverse="true"
                @change-color="(hex) => updateTitlesColor(hex)"
            />
        </div>

        <div class="property-block">
            <span>Основной цвет</span>

            <InputColor
                class="input-bg-color"
                v-model="mainTextColorRGB"
                :reverse="true"
                @change-color="(hex) => updateMainTextColor(hex)"
            />
        </div>

    </toolPanelContext>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import toolPanelContext from './toolPanelContext.vue';

import ThemeColorsIcon from "@/components/icons/editorThemePanel/ThemeColorsIcon.vue";

import InputColor from '@/components/UI/InputColor.vue';

import { usePresentationStore } from '@/stores/presentation';
const { activePresentation, ifPresentation, setThemeByTemplateName} = usePresentationStore()

import { useColor } from '@/composables/useColor';
import type { RGBcolor } from '@/types/Presentation';

import { themes } from '@/stores/themes';

const { hexToRgb, rgbToHex } = useColor()

const emit = defineEmits<{
    (event : 'hide') : void
}>()

const bgColorRGB = ref<RGBcolor>(activePresentation?.theme.background_color || [255,255,255])
const titlesColorRGB = ref<RGBcolor>(activePresentation?.theme.font_info.titles.color || [0,0,0])
const mainTextColorRGB = ref<RGBcolor>(activePresentation?.theme.font_info.main_texts.color || [0,0,0])

const updateBgColor = (hex : string) => {
    const rgb = hexToRgb(hex)
    bgColorRGB.value = rgb
    ifPresentation((pres)=>{
        pres.theme.background_color = rgb
    })
}
const updateMainTextColor = (hex : string) => {
    const rgb = hexToRgb(hex)
    mainTextColorRGB.value = rgb
    ifPresentation((pres)=>{
        pres.theme.font_info.main_texts.color = rgb
    })
}
const updateTitlesColor = (hex : string) => {
    const rgb = hexToRgb(hex)
    titlesColorRGB.value = rgb
    ifPresentation((pres)=>{
        pres.theme.font_info.titles.color = rgb
    })
}

</script>

<style scoped>

.theme-colors-blocks{
    display: flex;
    flex-wrap: wrap;
    gap: 6.5px;
}
.theme-colors-icon{
    cursor: pointer;
    width: 24px;
    height: 24px;
    /* flex: calc(100% / 8 - 6.5px); */
}
.theme-colors-icon.active{
    border: 2px solid var(--color-accent);
    border-radius: 6px;
}

.select-theme-btn{
    position: relative;
    border-radius: 8px;
    padding: 12px;
    padding-left: 18px;
    font-size: 18px;
    overflow: hidden;
    cursor: pointer;
}
.theme-block-pattern{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 27.5%;
}

.property-block{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 8px;
}
.property-block > *{
    min-width: 49%;
}

</style>