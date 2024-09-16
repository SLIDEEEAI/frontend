<script setup lang="ts">

import router from '@/router';

function back() {
    router.push({name:'home'})
}
</script>

<template>
    <div class="auth-page">
        <button class="back-btn" @click="back">Назад</button>
        <div class="auth-page__content">
            <div class="auth-wrap">
                <RouterView />
            </div>
        </div>
        <div class="decorative-block">
            <transition name="fade">
                <div v-show="$route.name == 'login'" class="login"></div>
            </transition>
            <transition name="fade">
                <div v-show="$route.name == 'signin'" class="signin"></div>
            </transition>
        </div>
    </div>
</template>

<style>
.back-btn {
    position: absolute;
    left: 20px;
    top: 20px;
    background-color: transparent;
    color: var(--color-text-dim);
}

.container {
    padding: 0;
}


.auth-page {
    position: relative;
    display: flex;
    height: 100vh;
    background: var(--color-background-soft);
}

.auth-page h2 {
    font-size: 34px;
    line-height: 100%;
    font-style: normal;
    font-weight: 700;
    color: var(--color-heading);
}
.auth-page>div {
    width: 50%;
    height: 100%;
}

.auth-page__content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-wrap {
    border-radius: 25px;
    background: var(--color-background);
    margin: auto;
    max-width: 100%;
    width: 699px;
    max-height: 817px;
    padding: 72px 52px;
}

.auth-wrap form {
    display: flex;
    flex-direction: column;
    gap: 40px;
}


.auth-wrap .auth-wrap__row {
    display: flex;
    flex-direction: column;
    gap: 20px;
}


.auth-wrap button {
    margin: 0 auto;
}
</style>

<style scoped>

.decorative-block{
    position: relative;
}
.decorative-block > div{
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position-y: center;
}
.decorative-block > div.login{
    background-image: url(@/assets/view_login_bg.svg);
}
.decorative-block > div.signin{
    background-image: url(@/assets/view_signin_bg.svg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>