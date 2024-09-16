<template>
    <div class="home-page">

        <MainSection class="home-page-block custom-pt" />

        <div class="main-gif home-page-block">

        </div>

        <TgSection class="home-page-block custom-pt"/>
        <PromoSection class="home-page-block"/>

        <ThemesSection class="home-page-block"/>
        <RatesSection class="home-page-block" id="rates"/>
        <FaqSection class="home-page-block"/>
    </div>
</template>

<script lang="ts" setup>

import MainSection from '@/components/home/sections/MainSection.vue';
import TgSection from '@/components/home/sections/TgSection.vue';
import PromoSection from '@/components/home/sections/PromoSection.vue';
import ThemesSection from '@/components/home/sections/ThemesSection.vue';
import RatesSection from '@/components/home/sections/RatesSection.vue';
import FaqSection from '@/components/home/sections/FaqSection.vue';


</script>

<style scoped>
.home-page{
    background-color: var(--color-background-soft);
    height: 100%;
    /* min-height: 100vh; */
    min-height: 3000px;
    font-size: 16px;
}
.home-page-block:not(.custom-pt){
    padding-top: 150px;
}
</style>