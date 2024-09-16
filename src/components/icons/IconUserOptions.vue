<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#D2D2D2" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="4" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="12" cy="20" r="2"/>
    </svg>
</template>

<script lang="ts" setup>

defineOptions({
    name: 'icon-user-options'
})

</script>

<style scoped>

svg > circle{
    will-change: fill;
}
svg:hover > circle{
    fill: var(--color-accent-light);
}

</style>