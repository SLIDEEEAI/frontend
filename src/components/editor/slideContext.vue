<template>
    <div class="slide-context" :style="{left: x +'px', top: y+'px'}" @click.stop>
        <div class="slide-context-block">
            <button class="slide-context-btn" @click="dublicateSlide(slideIndex); emit('hide');">
                Дублировать слайд
            </button>
            <button class="slide-context-btn">
                Скачать как картинку
            </button>
        </div>
        <div class="splitter"></div>
        <div class="slide-context-block">
            <button class="slide-context-btn" @click="removeSlide(slideIndex); emit('hide');">
                Удалить
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { usePresentationStore } from "@/stores/presentation";

const { removeSlide, dublicateSlide } = usePresentationStore()

defineProps<{
    x: number,
    y:number,
    slideIndex : number
}>()

const emit = defineEmits<{
    (event:'hide') : void
}>()

onMounted(() => {
    window.addEventListener('click', function () {
        emit('hide');
    })
})
</script>

<style scoped>

    @keyframes show{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .slide-context{
        position: fixed;
        width: 244px;
        background: var(--color-background-soft);
        border-radius: var(--radius-common);
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        z-index: 100;
        opacity: 1;
        box-shadow: var(--context-shadow);
        animation: show 0.2s forwards;
    }
    .slide-context-block{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .slide-context-btn{
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        background: transparent;
        padding: 7px 8px;
        border-radius: 4px;
        justify-content: flex-start;
        transition: background 0.2s;
    }
    .slide-context-btn:hover, .slide-context-btn:focus-visible{
        background: var(--color-accent);
    }
    .splitter{
        background: var(--color-background);
        width: 100%;
        height: 2px;
    }
</style>