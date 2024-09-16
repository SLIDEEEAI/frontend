<template>
    <div class="tools-panel-item-context" @click.stop>
        <slot></slot>

        <div class="loading-layout" v-if="loading">
            <loading-icon :size="12"/>
        </div>

    </div>
</template>

<script lang="ts" setup>

import LoadingIcon from '@/components/icons/LoadingIconBlock.vue';

defineProps<{
    loading ?: boolean 
}>()

</script>

<style>

.loading-layout{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000030;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    cursor: wait;
}

.tools-panel-item-context{
    position: absolute;
    top: calc(100% + 16px);
    width: 334px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px;
    border-radius: var(--radius-common);
    background: var(--color-background-soft);
    box-shadow: var(--context-shadow);
    z-index: 1;
}
.tools-panel-item-context .splitter{
    width: 100%;
    height: 2px;
    background: var(--color-background);
}
</style>