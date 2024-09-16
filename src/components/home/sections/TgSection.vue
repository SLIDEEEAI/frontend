<template>
    <section class="tg-promocode">
        <div class="container">
            <div class="left">
                <h3>
                    попробуйте<br><span class="text-gradient">бесплатно</span>
                </h3>
                <label>
                    Получите токены в нашем <br>Telegram канале
                </label>
            </div>
            <div class="right">
                <SwipeLink class="swipe-link" :to="'https://t.me/svu22'" :blank="true" :light="true">
                    Получить промокод
                </SwipeLink>
            </div>
        </div>
        <div class="black-layout">
            <img src="@/assets/images/big-tg-logo.png">
        </div>
    </section>
</template>

<script lang="ts" setup>
import SwipeLink from "@/components/UI/SwipeLink.vue";
</script>

<style scoped>
    .tg-promocode{
        position: relative;
        padding: 67px 0;
        height: 447px;
        background: var(--color-background);
        overflow: hidden;
    }
    .black-layout{
        width: 50%;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        border-radius: 40px 0px 0px 40px;
        background: var(--color-bg-dark-extra);
    }
    .black-layout > img{
        position: absolute;
        bottom: 0;
        left: 47px;
    }
    .container{
        position: relative;
        height: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }
    h3{
        text-transform: uppercase;
        font-size: 48px;
        line-height: 50.64px;
        font-weight: 700;
    }
    label{
        font-size: 22px;
        color: var(--color-text-soft);
        line-height: 23.21px;
    }
    .left{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 32px;
    }
    .right{
        width: 50%;
        height: 100%;
        padding: 0 47px;
        display: flex;
        align-items: flex-start;
    }
    .swipe-link{
        width: 437px;
        height: 66px;
        font-size: 24px;
    }
</style>