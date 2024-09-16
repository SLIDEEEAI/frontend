<template>
        <div class="loading-icon">
            <div class="dot" :style="{width : size + 'px', height : size + 'px'}"></div>
            <div class="dot" :style="{width : size + 'px', height : size + 'px'}"></div>
            <div class="dot" :style="{width : size + 'px', height : size + 'px'}"></div>
        </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'loading-icon'
})

withDefaults(defineProps<{
    size ?: number
}>(),{
    size : 18
})

</script>

<style scoped>
@keyframes dotJump{
    0%{
        translate: 0px 0px;
    }
    70%{
        translate: 0px 66%;
    }
    100%{
        translate: 0px 0px;
    }
}
.loading-icon{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    gap: 12px;
    width: fit-content;
    height: fit-content;
    margin: auto;
}
.dot{
    width: 18px;
    height: 18px;
    background-color: var(--color-text-dim);
    border-radius: 50%;
    animation: dotJump 1.4s ease-out infinite;
}
.dot:nth-child(1){
    animation-delay: 0.2s;
}
.dot:nth-child(2){
    animation-delay: 0.48s;
}
.dot:nth-child(3){
    animation-delay: 0.76s;
}
</style>