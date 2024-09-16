<template>
<svg :class='$props.direction' width="55" height="21" viewBox="0 0 55 21" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.8437 0.357998C38.4968 0.141766 38.0532 0.158445 37.7236 0.400118L36.7915 1.08337C36.2054 1.51297 36.2587 2.4044 36.8918 2.76111L48.2153 9.14153H1.04102C0.488731 9.14153 0.0410156 9.58925 0.0410156 10.1415V10.7665C0.0410156 11.3188 0.488731 11.7665 1.04102 11.7665H48.2153L36.5426 18.1755C35.8716 18.544 35.8465 19.499 36.4973 19.9022L37.7388 20.6713C38.0635 20.8725 38.4744 20.8711 38.7978 20.6678L53.6888 11.3043C54.3139 10.9113 54.3121 9.99966 53.6855 9.6091L38.8437 0.357998Z"/>
</svg>

</template>

<script lang="ts" setup>

withDefaults( defineProps<{ 
    direction ?: 'left' | 'right'
}>(), { 
    direction: 'right' 
})

</script>

<style scoped>
svg{
    transition: none;
}
.left{
rotate: 0deg;
}
.right{
rotate: 180deg;
}
</style>