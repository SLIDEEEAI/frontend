<template>
    <div class="user-panel-context-menu" ref="contextMenu">
        <div class="user-context-block user-info-block">
            <div class="user-avatar-wrap">
                <img v-if="userLogoUrl" :src="userLogoUrl">
                <span v-else>{{ userInitials }}</span>
            </div>
            <div class="user-name-and-mail">
                <span>{{ currentUser.name }}</span>
                <span>{{ currentUser.email }}</span>
            </div>
        </div>
        <div class="user-context-block user-options-block">
            <button class="user-option" @click="testApi">
                Тест апи
            </button>
            <button class="user-option">
                <icon-notice class="icon"/>
                Уведомления
            </button>
            <button class="user-option">
                <icon-chat class="icon"/>
                Поддержка
            </button>
            <button class="user-option" @click="logoutUser">
                <icon-exit class="icon" :color="'red'"/>
                Выйти из аккаунта
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

import { useUserStore } from '@/stores/user';
import { useNotificationStore } from "@/stores/notification";

import { testApi } from '@/api/testApi'

const { currentUser, logout, userLogoUrl, userInitials } = useUserStore();
const { showNotification } = useNotificationStore()

const contextMenu = ref<HTMLElement | null>(null)
const isOpen = ref<boolean>(false);

const logoutUser = async () => {
    logout()
    showNotification('Вы вышли из аккаунта')
}

const emit = defineEmits< { (event : 'close') : void } >()

const closeOnEscape = (event : KeyboardEvent) => {
    if (event.key === 'Escape') {
        isOpen.value = false;
        emit('close')
    }};

const closeOnClickOutside = (event : any) => {
    if (contextMenu.value && !contextMenu.value.contains(event.target)) {
        isOpen.value = false;
        emit('close')
    }};

onMounted(() => {
    window.addEventListener('keyup', closeOnEscape);
    window.addEventListener('click', closeOnClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('keyup', closeOnEscape);
    window.removeEventListener('click', closeOnClickOutside);
});


// const testConstructPres = () => constructPresentation('Про редких медуз',[
//     'Редкие медузы и их загадочная жизнь',
//     'Многообразие форм и цветов редких медуз',
// ])


</script>

<style scoped>
@keyframes show{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.user-panel-context-menu{
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: absolute;
    right: 0;
    top: calc(100% + 25px);
    z-index: 1;
    height: fit-content;
    min-width: 350px;
    padding: 16px;
    border-radius: var(--radius-sm);
    background: var(--color-background-soft);
    box-shadow: var(--context-shadow);
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    opacity: 0;
    animation: show 0.2s forwards;
}
.user-context-block{
    display: flex;
    gap: 8px;
    align-items: center;
}
.user-name-and-mail > span:first-child{
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
}
.user-options-block{
    flex-direction: column;
}
.user-option{
    width: 100%;
    background: transparent;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    justify-content: flex-start;
    gap: 16px;
    padding: 5px 16px;
    border-radius: var(--radius-xsm);
}
.user-option .icon{
    width: 32px;
    height: 32px;
}
.user-option:hover{
    background: var(--color-background);
}
.user-option:focus-visible{
    background: var(--color-background);
    outline: 1px solid var(--color-accent);
}
.user-option:hover .icon,
.user-option:focus-visible .icon{
    fill: var(--color-accent-light) !important;
}

.user-avatar-wrap{
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(125deg, #9517DA 25%, #C52BB8 50%, #FA615E 75%, #E54294 100%);
    border-radius: 50%;
    margin-right: 16px;
    overflow: hidden;
}

</style>