<script setup lang="ts">

import router from '@/router';

import WsHeader from '@/components/workspace/WsHeader.vue';
import WsSidebar from '@/components/workspace/WsSidebar.vue';
// import ProjectContextMenu from '@/components/workspace/ProjectContextMenu.vue';

// import { useContextStore } from "@/stores/contextMenu";
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
const { currentUser } = storeToRefs(useUserStore());

import { useNotificationStore } from "@/stores/notification";
// const { contextState, cssPosition } = storeToRefs(useContextStore());

const payment = router.currentRoute.value.query.payment
if (payment) {
    if (payment == '1') {
        useNotificationStore().showNotification('Оплата прошла успешно!', 'success', true)
    }
    if (payment == '0') {
        useNotificationStore().showNotification('оплата не прошла!', 'error', true)
    }
}

</script>

<template>
    <div class="workspace-page">

        <ws-sidebar 
            :balance="currentUser.balance"
        />

        <div class="workspace-page__wrap">

            <ws-header 
                :username="currentUser.name"
            />

            <div class="workspace-page_content">
                <div class="workspace-container workspace-view">
                    <RouterView />

                </div>
            </div>
        </div>

        <!-- <project-context-menu 
            :class="{'shown': contextState.isShown}"
            :position="cssPosition"
        /> -->

    </div>
</template>

<style>

:root{
    --ws-sidebar-width: 319px;
    --ws-header-height: 97px;
}

.workspace-page{
    display: flex;
    min-height: 100vh;
}

.sidebar{
    max-width: var(--ws-sidebar-width);
    width: var(--ws-sidebar-width);
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}
.sidebar_panel{
    position: fixed;
    max-width: 319px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.workspace-page__wrap{
    width: 100%;
    background: var(--color-background);
    padding-left: var(--ws-sidebar-width);
}
.workspace-page__wrap p{
    font-size: 28px;
    margin: 40px;
}

.workspace-page_content{
    padding-top: 40px;
}

.workspace-content{
    width: 100%;
}

.workspace-container{
    padding: 0 30px;
    height: 100%;
}

.workspace-view{
    padding-bottom: 60px;
}

</style>
