<script setup lang="ts">

import ProfileTab from '@/views/workspace/settings/ProfileTab.vue';
import SubscribtionTab from '@/views/workspace/settings/SubscribtionTab.vue';
import RefTab from '@/views/workspace/settings/RefTab.vue';

</script>

<template>
    <div class="settings-view ">
        <nav class="settings-top-panel">
            <RouterLink 
                :to="{query: {tab:'profile'}}" 
                :class="{active: $route.query.tab == 'profile' || !$route.query.tab}" 
                :active-class="'settings-tab-link'"
            >Настройки аккаунта</RouterLink>
            <RouterLink 
                :to="{query: {tab:'subscribtion'}}" 
                :class="{active: $route.query.tab == 'subscribtion'}" 
                :active-class="'settings-tab-link'"
            >Подписка</RouterLink>
            <RouterLink 
                :to="{query: {tab:'ref'}}" 
                :class="{active: $route.query.tab == 'ref'}" 
                :active-class="'settings-tab-link'"
            >Реферальная программа</RouterLink>
        </nav>
        <div class="settings-view__wrap">

            <SubscribtionTab v-if="$route.query.tab == 'subscribtion'"/>
            <RefTab v-else-if="$route.query.tab == 'ref'"/>
            <ProfileTab v-else/>

        </div>
    </div>
</template>

<style>
    .settings-view{
        padding-top: 16px;
    }
    .settings-view__wrap{
        max-width: 1200px;
        width: 100%;
    }
    .settings-top-panel{
        display: flex;
        gap: 80px;
        padding-bottom: 26px;
        border-bottom: 1px solid var(--color-background);
        margin-bottom: 26px;
    }
    .settings-tab-link{
        font-size: 22px;
        font-weight: 400;
        color: var(--color-white);
        opacity: 0.9;
        will-change: contents;
        text-decoration: underline;
        text-decoration-color: transparent;
        text-decoration-thickness: 3px;
        text-underline-offset: 10px;
    }
    .settings-tab-link.active{
        opacity: 1;
        text-decoration-color: var(--color-accent-light);
    }
    
    .settings-tab__block{
        display: flex;
        flex-direction: column;
        background: var(--color-background-soft);
        border-radius: var(--radius-common);
        padding: 32px;
    }
    .settings-tab__block h3{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 32px;
    }
</style>