<template>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.3818 16.7327L16.1381 13.3618H11.6218L10.3781 16.7327H8.54541L12.98 5H14.8127L19.2309 16.7327H17.3818ZM14.469 8.53454C14.4363 8.41454 14.3763 8.23454 14.289 7.99454C14.2127 7.74364 14.1363 7.49273 14.06 7.24182C13.9836 6.98 13.9236 6.76727 13.88 6.60364C13.8254 6.82182 13.76 7.06182 13.6836 7.32364C13.6181 7.57454 13.5527 7.80909 13.4872 8.02727C13.4218 8.23455 13.3672 8.40364 13.3236 8.53454L12.1454 11.8236H15.6472L14.469 8.53454Z" fill="white"/>
        <rect x="4" y="18.5508" width="20" height="4.54545" rx="0.454545" 
            :fill="rgbCss() || 'white'"
        />
    </svg>
</template>

<script lang="ts" setup>
    const props = defineProps<{ rgb ?: [number, number, number] }>()

    const rgbCss = () => props.rgb ? `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})` : false

</script>