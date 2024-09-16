<template>
    <svg :class='$props.direction' width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21.5129 14.3214C21.5129 14.6272 21.2651 14.875 20.9593 14.875H6.55357C6.24784 14.875 6 15.1228 6 15.4286V16.9048C6 17.2105 6.24784 17.4583 6.55357 17.4583H20.9593C21.2651 17.4583 21.5129 17.7062 21.5129 18.0119V19.9945C21.5129 20.488 22.1099 20.7349 22.4584 20.3855L26.2767 16.5576C26.4922 16.3415 26.4922 15.9918 26.2767 15.7757L22.4584 11.9479C22.1099 11.5985 21.5129 11.8453 21.5129 12.3388V14.3214Z" />
    </svg>
</template>

<script lang="ts" setup>
withDefaults( defineProps<{ 
    direction ?: 'left' | 'right' | 'up' | 'down' 
}>(), { 
    direction: 'left' 
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
.up{
rotate: -90deg;
}
.down{
rotate: 90deg;
}

</style>