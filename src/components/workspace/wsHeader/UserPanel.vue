<template>
    <div class="user-panel">

        <div class="user-avatar-wrap">
            <img v-if="userLogoUrl" :src="userLogoUrl">
            <span v-else>{{ userInitials }}</span>
        </div>

        <span class="user-name">
            {{ currentUser.name }}
        </span>

        <icon-user-options class="user-settings-btn" :style="{ 'margin-left' : dotsMargin || '80px' }" title="Настройки" @click="openContext"/>

        <UserPanelContext v-if="isOpen" @close="closeContext"/>

    </div>
</template>

<script lang="ts" setup>
import UserPanelContext from '@/components/workspace/wsHeader/UserPanelContext.vue';

import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const { currentUser, userInitials, userLogoUrl } = useUserStore();

const isOpen = ref<boolean>(false)

const openContext = () => {
    setTimeout(function(){
        isOpen.value = true
    }, 50)
}
const closeContext = () => {
    isOpen.value = false
}

defineProps<{
    dotsMargin ?: string
}>()

</script>

<style scoped>



.user-panel{
    position: relative;
    display: flex;
    align-items: center;
    background: var(--color-background-soft);
}
.user-name{
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
    color: var(--color-text-white-dim);
}
.user-avatar-wrap{
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 18px;
    font-weight: 700;
    background: linear-gradient(125deg, #9517DA 25%, #C52BB8 50%, #FA615E 75%, #E54294 100%);
    border-radius: 50%;
    margin-right: 16px;
    overflow: hidden;
}
.user-info-block .user-avatar-wrap{
    width: 48px;
    height: 48px;
    font-size: 22px;
}
.user-settings-btn{
    cursor: pointer;
    margin-left: 80px;
}

</style>
