<template>
    <header :class="{'shadow' : pageScroll}">
        <div class="container">  
            <div class="left">
                <div class="logo">
                    <img src="@/assets/images/header-logo.png" alt="">
                </div>
                <nav class="links">
                    <router-link :to="{name:'home'}" class="header-link">Главная</router-link>
                    <a class="header-link">Тарифы</a>
                    <a class="header-link">Slideee Search</a>
                </nav>    
            </div>
            <nav class="right">
                <template v-if="isLogged">
                    <router-link :to="{name: 'projects'}" class="header-link">Мои проекы</router-link>
                    <UserPanel class="header-user-panel"  :dots-margin="'30px'" />
                </template>
                <template v-else>
                    <router-link :to="{name: 'login'}" class="header-link">Войти</router-link>
                    <router-link :to="{name: 'signin'}" class="header-link">
                        <button>Регистрация</button>
                    </router-link>
                </template>
            </nav>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import UserPanel from '../workspace/wsHeader/UserPanel.vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const { isLogged } = userStore

const pageScroll = ref(document.documentElement.scrollTop)

document.addEventListener('scroll', function () {
    pageScroll.value = document.documentElement.scrollTop
})

// defineProps<{
//     scroll : number
// }>()

</script>

<style scoped>

header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 32px 0;
    font-size: 16px;
    color: #CFCFCF;
    z-index: 100;
}
.header-link{
    color: inherit;
}
.header-link:hover{
    cursor: pointer;
    color: var(--color-accent-light); 
}

header.shadow{
    background-color: rgba(0, 0, 0, 0.45);
    box-shadow: 0px 0px 16px 14px rgba(0, 0, 0, 0.45);
    padding: 12px 0;
}
header .container{
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo{
    display: flex;
}

header .left, header .right{
    display: flex;
    align-items: center;
}
header .left{ gap: 75px; }
header .right{ gap: 32px; color: #D2D2D2; }

header .links{
    display: flex;
    gap: 45px;
}
header button{
    width: 219px;
    height: 46px;
    border-radius: 7px;
    font-size: inherit;
    color: inherit;
    background-color: var(--color-background);
}

.header-user-panel{
    background-color: transparent;
    margin-left: 40px;
}

</style>