<script setup lang="ts">
import UserPanel from '@/components/workspace/wsHeader/UserPanel.vue';
import CreateProjectBtn from '@/components/workspace/wsHeader/CreateProjectBtn.vue';
</script>

<template>

    <header>
        <div class="workspace-container">

            <h2>{{ $route.meta.tabName ? $route.meta.tabName : 'Презентации' }}</h2>

            <div class="header-panel">

                <CreateProjectBtn class="header-panel_item"/>

                <user-panel class="header-panel_item"/>

            </div>

        </div>
    </header>

</template>

<style scoped>
header{
    width: 100%;
    height: var(--header-height);
    position: sticky;
    top: 0;
    padding: 14px 0;
    background-color: var(--color-background);
    border-bottom: 3px solid var(--color-background-soft);
    z-index: 100;
}
header h2{
    color: var(--color-text);
    font-size: 20px;
    font-weight: 700;
}
header .header-panel{
    height: 100%;
    display: flex;
    gap: 23px;
}
header .workspace-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-panel_item{
    height: 64px;
    padding: 0px 26px 0px 26px;
    border-radius: var(--radius-common);
    font-size: 18px;
    font-weight: 600;
}
</style>