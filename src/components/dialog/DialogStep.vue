<template>
    <div class="dialog-step">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.dialog-step {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* position: relative;
    border-radius: 30px;
    background: var(--color-background-op);
    width: 1154px;
    min-height: 682px;
    padding: 40px 65px;
    font-size: 16px;
    overflow: hidden;
    z-index: 1; */
}

</style>