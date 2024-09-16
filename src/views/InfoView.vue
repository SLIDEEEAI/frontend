<template>
    <div class="info-page">
        <div class="container">
            <h1>{{ $route.meta.title }}</h1>
            <RouterView/>
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>

<style scoped>

.info-page{
    background: var(--color-background-soft);
    padding-top: 130px;
    padding-bottom: 130px;
}

h1{
    margin-bottom: 40px;
}
</style>