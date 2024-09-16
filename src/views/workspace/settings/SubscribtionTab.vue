<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { type Rate } from "@/types/Rate";

import RateBlock from "@/components/workspace/settings/RateBlock.vue";

const { currentUser } = useUserStore()

const ratePeriod = ref<'month'|'year'>('month')

const rates = ref<Rate[]>([
    {
        id : 1,
        title : 'Базовый',
        monthCost : 0,
        yearCost : 0,
        advantages : ['Преимущество', 'Преимущество', 'Преимущество', 'Преимущество'],
        active : true
    },
    {
        id : 2,
        title : 'Продвинутый',
        monthCost : 200,
        yearCost : 2199,
        advantages : ['Преимущество', 'Преимущество', 'Преимущество', 'Преимущество'],
        active : false
    },
    {
        id : 3,
        title : 'Профессиональный',
        monthCost : 500,
        yearCost : 5499,
        advantages : ['Преимущество', 'Преимущество', 'Преимущество', 'Преимущество'],
        active : false
    },
    {
        id : 4,
        title : 'Корпоративный',
        monthCost : 1300,
        yearCost : 14299,
        advantages : ['Преимущество', 'Преимущество', 'Преимущество', 'Преимущество'],
        active : false
    },
])

</script>

<template>
    <div class="settings-tab subscription-tab">

        <div class="settings-tab__block w-100">
            <h3>Подписка</h3>

            <div class="tokens-block dark-block">
                <span class="user-tokens-title">Ваши токены</span>
                <span class="user-tokens">{{ currentUser.balance }}/300</span>
                <span class="text-gray" >
                    Как работают токены 
                    <ui-tooltip
                        :text="'Текст пояснение при наведении'"
                    >
                        <icon-explain />
                    </ui-tooltip>
                    </span>
            </div>

            <div class="rate-period-block">
                <div class="dark-block">
                    <button class="rate-period-btn" :class="{'active' : ratePeriod == 'month', 'theme-gradient' : ratePeriod == 'month'}" @click="ratePeriod = 'month'">
                        <span>Месяц</span>
                    </button>
                    <button class="rate-period-btn" :class="{'active' : ratePeriod == 'year', 'theme-gradient' : ratePeriod == 'year'}" @click="ratePeriod = 'year'">
                        <span>Год</span>
                    </button>
                </div>
            </div>

            <div class="rates-block">
                <RateBlock 
                    class="dark-block rate-block"
                    v-for="rate, index in rates"
                    :key="index"
                    :rate="rate"
                    :rate-period="ratePeriod"
                />
            </div>

        </div>

        <h4>Часто задаваемые вопросы о подписках</h4>

        <div class="questions-block">
            <ui-accordion >
                <template v-slot:title>Какой тариф мне подойдет?</template>
                <template v-slot:text>Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет?</template>
            </ui-accordion>
            <ui-accordion >
                <template v-slot:title>Какой тариф мне подойдет?</template>
                <template v-slot:text>Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет?</template>
            </ui-accordion>
            <ui-accordion >
                <template v-slot:title>Какой тариф мне подойдет?</template>
                <template v-slot:text>Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет?</template>
            </ui-accordion>
            <ui-accordion >
                <template v-slot:title>Какой тариф мне подойдет?</template>
                <template v-slot:text>Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет? Какой тариф мне подойдет?</template>
            </ui-accordion>
        </div>
</div>
</template>


<style scoped>
h4{
    font-size: 18px;
    margin-top: 54px;
    margin-bottom: 32px;
}
.questions-block{
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.dark-block{
    background: var(--color-background);
    border-radius: var(--radius-sm);
    display: flex;
    padding: 24px;
}
.user-tokens{
    font-weight: 600; 
    font-size: 18px;
}
.user-tokens-title{
    font-weight: 600; 
    font-size: 16px;
    margin-right: 130px;
}
.rate-period-block{
    margin: 32px 0;
    width: 100%;
    display: flex;
    justify-content: center;
}
.rate-period-block .dark-block{
    width: 242px;
    padding: 6px !important;
    justify-content: space-between;
    border-radius: 100px;
}

.rate-period-btn{
    border-radius: 100px;
    position: relative;
    color: var(--color-text-grey);
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    width: 103px;
    height: 28px;
    background-color: transparent;
}
.rate-period-btn::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 2px;
    top: 2px;
    background: var(--color-background);
    border-radius: 100px;
    z-index: 0;
}
.rate-period-btn span{
    z-index: 1;
}
.rate-period-btn.active{
    color: var(--color-text);
}
.rate-period-btn.active::after{
    width: calc(100% - 4px);
    height: calc(100% - 4px);
}
.text-gray{
    cursor: help;
    margin-left: auto;
    margin-right: 0;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 16px;
    color: var(--color-text-grey);
}

.rate-block{
    min-height: 429px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.rates-block{
    display: flex;
    gap: 30px;
    justify-content: space-between;
}
</style>