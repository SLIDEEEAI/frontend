<template>
    <main>
        <div class="container">
            <h1>
                Искусственный интеллект <br>
                для идеальных презентаций
            </h1>
            <span>
                Введите только тему презентации - остальное <br>
                сделает нейросеть
            </span>
            <div class="prompt-field">
                <input v-focus type="text" placeholder="  Введите тему вашей презентации">
                <button class="theme-gradient" @click="$router.push({name:'login'})">
                    <IconArrow :direction="'left'"/>
                </button>
            </div>

            <div class="main-video-promo">
                <video autoplay muted loop>
                    <source src="@/assets/videos/video-promo-full.mp4">
                </video>
            </div>

        </div>

        <MainGradient class="pattern"/>

    </main>
</template>

<script lang="ts" setup>

import MainGradient from '../MainGradient.vue';
import IconArrow from '@/components/icons/IconArrow.vue';

</script>

<style scoped>

main{
    position: relative;
    color: var(--color-text);
    padding-top: 216px;
    text-align: center;
    cursor: default;
    min-height: 850px;
}

.pattern{
    width: 100%;
    top: 70px;
}
.container{
    position: relative;
    padding: 0 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
}
h1{
    font-size: 65px;
    font-weight: 700;
    line-height: 66.3px;
    text-transform: uppercase;
    margin-bottom: 34px;
    cursor: inherit;
}
span{
    font-size: 24px;
    font-weight: 500;
    line-height: 25.32px;
    margin-bottom: 45px;
    cursor: inherit;
}
.prompt-field{
    position: relative;
    width: 100%;
    max-width: 1100px;
    border-radius: var(--radius-xsm);
    overflow: hidden;
    margin-bottom: 414px;
}
input {
    width: 100%;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    background: var(--color-background);
    color: var(--color-text);
    caret-color: var(--color-accent);
    padding: 14px 24px;
    border: none;
    cursor: text;
}
button{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    aspect-ratio: 1;
}
.main-video-promo{
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 20px;
    overflow: hidden;
}
video{
    width: 100%;
}
</style>