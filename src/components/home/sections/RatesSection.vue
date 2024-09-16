<template>
    <section class="rates-section">
        <div class="container">
            <h2>Тарифы для каждого</h2>
            
            <div class="rates-wrap">

                <div class="rate-item" v-for="rate in rates" :key="rate.id">

                    <div class="rate-name theme-gradient">
                        <span>
                            {{ rate.name }}
                        </span>
                    </div>

                    <div class="rate-info">
                        
                        <div class="rate-price">
                            <template v-if="rate.cost > 0">
                                <span>{{ rate.cost }}</span> руб
                            </template>
                            <template v-else>
                                <span style="color: inherit;">Бесплатно</span>
                            </template>
                        </div>

                        <div class="rate-tokens">
                            <div>
                                <span class="text-gradient">{{ rate.tokens }}</span>
                                токенов
                            </div>
                            <span>~</span>
                            <div>
                                <span>{{ rate.projectsQuantity }}</span>
                                <!-- презентаций -->
                                 слайдов
                            </div>
                        </div>

                        <ul class="rate-advantages">
                            <li v-for="(adv, index) in rate.advantages" :key="index">
                                <icon-gap-done style="min-width: 16px;"/> {{ adv }}
                            </li>
                        </ul>

                        <button class="theme-gradient">
                            <span>{{ rate.cost > 0 ? 'Подключить' : 'Попробовать' }}</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

import IconGapDone from '@/components/icons/IconGapDone.vue';
interface Rate{
    id : number
    name : string
    cost : number
    tokens : number
    projectsQuantity : number
    advantages : string[]
}

const rates = ref<Rate[]>([
    {
        id : 1,
        name : 'Базовый',
        cost : 0,
        tokens : 1000,
        projectsQuantity : 1,
        advantages : [
            'Базовый функционал редактора', 
            'gpt-3.5',
            'dalle-2',
            'Экспорт в pdf'
        ]
    },
    {
        id : 2,
        name : 'Стандартный',
        cost : 160,
        tokens : 4000,
        projectsQuantity : 8,
        advantages : [
            'Базовый функционал редактора', 
            'gpt-3.5',
            'dalle-2 / dalle-3',
            'Экспорт в pdf и pptx'
        ]
    },
    {
        id : 3,
        name : 'Продвинутый',
        cost : 320,
        tokens : 8000 ,
        projectsQuantity : 16,
        advantages : [
            'Базовый функционал редактора', 
            'gpt-3.5 / gpt-4',
            'dalle-2 / dalle-3', 
            'Перегенерация текста и картинок',
            'Экспорт в pdf и pptx'
        ]
    },
    {
        id : 4,
        name : 'Профессиональный',
        cost : 1250,
        tokens : 32000,
        projectsQuantity : 64,
        advantages : [
            'Расширенный функционал редактора', 
            'gpt-3.5 / gpt-4',
            'dalle-2 / dalle-3', 
            'Перегенерация текста и картинок', 
            'Кастомизация презентации',
            'Экспорт в pdf и pptx'
        ]
    },
])

</script>

<style scoped>
.rates-section{
    font-weight: 500;
}



h2{
    font-size: 58px;
    font-weight: 700;
    line-height: 61.19px;
    margin-bottom: 80px;
    text-transform: uppercase;
}
.rates-wrap{
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.rates-wrap *{
    transition: all 0.2s linear;
}
.rate-item{
    height: fit-content;
    min-height: 519px;
    max-width: 23.5%;
    flex-grow: 1;
    background: #1b1e1e;
    border-radius: var(--radius-md);
    font-size: 14px;
    color: var(--color-text-grey);
    margin-top: 32px;
    will-change: translate;
}
.rate-name{
    position: relative;
    /* background-color: aqua; */
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    padding: 2px;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.rate-name span{
    display: block;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    background-color: #1b1e1e;
    padding-top: 9px;
    padding-bottom: 8px;
    will-change: padding color;
}
.rate-info{
    display: flex;
    flex-direction: column;
    padding: 32px;
    padding-top: 40px;
}
button{
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 12.5px;
    font-size: inherit;
    color: var(--color-text);
    border: 1px solid var(--color-background-soft);
    border-radius: var(--radius-xsm);
}
button:after{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-background-soft);
}
button>span{
    z-index: 1;
}
.rate-price span{
    color: var(--color-text);
    font-size: 40px;
}
.rate-tokens{
    margin-top: 29px;
    margin-bottom: 29px;
    padding: 20px 24px;
    background: #131818;
    font-size: 12px;
    border-radius: var(--radius-common);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rate-tokens > span{
    font-size: 32px;
}
.rate-tokens > div{
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: normal;
}
.rate-tokens > div > span{
    color: var(--color-text);
    font-size: 22px;
}


.rate-advantages{
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 90px;
}
.rate-advantages li{
    display: flex;
    gap: 16px;
}

.rate-item:hover{
    translate: 0 -30px;
}
.rate-item:hover .rate-name span{
    color: var(--color-text);
    background-color: transparent;
    padding-top: 21px;
    padding-bottom: 25px;
}
.rate-item:hover button:after{
    background: transparent;
}
</style>