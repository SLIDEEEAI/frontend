<template>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1519_1146)">
        <rect width="24" height="24" rx="4" :fill="rgbToHex(color1)"/>
        <path d="M3.6684e-05 -0.49585L26 26.5042H0L3.6684e-05 -0.49585Z" :fill="rgbToHex(color2)"/>
    </g>
    <defs>
        <clipPath id="clip0_1519_1146">
            <rect width="24" height="24" rx="4" fill="white"/>
        </clipPath>
    </defs>
</svg>
</template>

<script lang="ts" setup>
import { useColor } from '@/composables/useColor';

const { rgbToHex } = useColor()

defineProps<{
    name : string,
    color1 : [number, number, number],
    color2 : [number, number, number]
}>()
</script>

<style scoped>


</style>