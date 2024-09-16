<script setup lang="ts">
import { ref } from "vue";
import IconGapDown from "@/components/icons/IconGapDown.vue";


defineOptions({
    name : 'ui-accordion'
})
const isShow = ref<boolean>(false)
// defineProps<{
//     title : string,
//     text : string
// }>()
</script>

<template>
    <div class="accordion-ui" :class="{'show':isShow}" @click="isShow = !isShow">
        <legend class="accordion-title">
            <slot name="title"></slot>
            <IconGapDown class="accordion-gap"/>
        </legend>
        <div class="accordion-text">
            <p>
                <slot name="text"></slot>
            </p>
        </div>
    </div>
</template>

<style scoped>
.accordion-ui{
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 16px 32px;
    border-radius: var(--radius-sm);
    background-color: var(--color-background-soft);
    color: var(--color-text);
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
}
.accordion-ui.show{
    gap: 24px;
}
.accordion-title{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.accordion-text p{
    width: 100%;
    height: auto;
    max-height: 0;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    transition: all 0.2s ease-in;
}
.show .accordion-text p{
    max-height: 800px;
    transition-delay: 0.4s;
    transition-timing-function: ease-out;
}
.accordion-text p{
    margin: 0;
    opacity: 0;
    font: inherit;
    transition: opacity 0.2s;
}
.show .accordion-text p{
    opacity: 1;
}

.show .accordion-gap{
    rotate: 180deg;
}
</style>