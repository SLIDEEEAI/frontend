<template>
    <svg :class="type" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M18.295 5.705C17.9056 5.31564 17.2744 5.31564 16.885 5.705L12.7071 9.88289C12.3166 10.2734 11.6834 10.2734 11.2929 9.88289L7.115 5.705C6.72564 5.31564 6.09436 5.31564 5.705 5.705C5.31564 6.09436 5.31564 6.72564 5.705 7.115L9.88289 11.2929C10.2734 11.6834 10.2734 12.3166 9.88289 12.7071L5.705 16.885C5.31564 17.2744 5.31564 17.9056 5.705 18.295C6.09436 18.6844 6.72564 18.6844 7.115 18.295L11.2929 14.1171C11.6834 13.7266 12.3166 13.7266 12.7071 14.1171L16.885 18.295C17.2744 18.6844 17.9056 18.6844 18.295 18.295C18.6844 17.9056 18.6844 17.2744 18.295 16.885L14.1171 12.7071C13.7266 12.3166 13.7266 11.6834 14.1171 11.2929L18.295 7.115C18.6844 6.72564 18.6844 6.09436 18.295 5.705Z"
            fill="#fff"
        />
    </svg>
</template>

<script setup lang="ts">
defineOptions({
    name: 'icon-close'
})
defineProps<{ type ?: 'success' | 'warning' | 'error' | 'information'}>()
</script>

<style scoped>
svg{
    cursor: pointer;
}
svg > path{
    fill: var(--color-text-grey)
}
svg.information > path{
    fill: var(--color-information);
}
svg.success > path{
    fill: var(--color-success);
}
svg.warning > path{
    fill: var(--color-warning);
}
svg.error > path{
    fill: var(--color-error);
}
</style>