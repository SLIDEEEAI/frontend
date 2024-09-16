<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
    name: 'ui-tooltip'
})

defineProps<{
    text : string
}>()

const isShow = ref<boolean>(false)

</script>

<template>
    <div class="tooltip-trigger" @click="isShow = !isShow">
        <slot></slot>
        <div class="tooltip" :class="{show : isShow}" >
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.tooltip-trigger{
    position: relative;
}
.tooltip{
    display: none;
    opacity: 0;
    transition: opacity 0.3s 0.1s;
    filter: drop-shadow(0px 0px 4px #00000040);
    position: absolute;
    bottom: calc(100% + 20px);
    translate: -75%;
    background-color: var(--color-background-mute);
    color: var(--color-text);
    border-radius: var(--radius-xsm);
    padding: 16px;
    min-width: 250px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    cursor: pointer;
}
@keyframes tooltipAppearing{
    100% {
        opacity: 1;
    }
}
.tooltip.show{
    display: block;
    animation: tooltipAppearing 0.4s ease 0.1s forwards;
}
.tooltip::after{
    content: '';
    position: absolute;
    bottom: -24px;
    right: calc(21.5% - 12px);
    width: 24px;
    height: 24px;
    border: 12px solid transparent;
    border-color: var(--color-background-mute) transparent transparent transparent;
}
</style>