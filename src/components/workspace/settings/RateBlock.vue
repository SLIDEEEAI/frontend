<script setup lang="ts">
import { type Rate } from "@/types/Rate";
import IconGapDone from "@/components/icons/IconGapDone.vue";

import { useUserStore } from '@/stores/user';
import { getPaymentLink } from "@/api/paykeeper/getPaymentLink";

const { currentUser } = useUserStore()

defineProps<{
    ratePeriod : 'month' | 'year'
    rate : Rate
}>()

const ratePeriodText = (period : 'month' | 'year') => {
    if (period == 'month') 
        return 'месяц'
    else return 'год'
}

async function activateRate(rate : Rate, ratePeriod : 'month' | 'year') {
    const rateString = `Тариф ${rate.id} - '${rate.title}' на ${ratePeriodText(ratePeriod)}`
    
    console.log(rateString, ratePeriod == 'month' ? rate.monthCost : rate.yearCost)

    const response = await getPaymentLink({
        "pay_amount": ratePeriod == 'month' ? rate.monthCost : rate.yearCost,
        "clientid": currentUser.id,
        "orderid": "test",
        "client_email": currentUser.email,
        "service_name": rateString,
        "client_phone": ""
    })

    if (response) {
        console.log('Ответ от ссылки на оплату:', response);
        window.location.replace(response.link);
    }

}
</script>

<template>
    <div>
        <div class="rate-info">
            <span class="rate-title">{{ rate.title }}</span>

            <span class="rate-cost">
                <!-- <template v-else-if="ratePeriod == 'month'">
                    {{ rate.monthCost != 0 ? rate.monthCost + 'руб/месяц' : 'Бесплатно' }}
                    <span></span>
                </template>
                <template v-else-if="ratePeriod == 'year'">
                    {{ rate.yearCost != 0 ? rate.yearCost + 'руб/год' : 'Бесплатно' }}
                </template> -->
                <template v-if="rate.monthCost == rate.yearCost">
                    Бесплатно
                </template>
                <template v-else>
                    {{ ratePeriod == 'month' ? rate.monthCost : rate.yearCost }}
                    <span class="text-lg">
                        {{ 'руб/' + ratePeriodText(ratePeriod)}}
                    </span>
                </template>
            </span>
            
            <div class="rate-advantages">
                <div class="rate-advantage" v-for="adv, index in rate.advantages" :key="index">
                    <IconGapDone />
                    <p>{{ adv }}</p>
                </div>
            </div>
        </div>
        <button class="rate-btn" 
            :class="{'active' : rate.active}"
            :disabled="rate.active"
            @click="activateRate(rate, ratePeriod)"
        >
        {{ rate.active ? 'Текущий' : 'Подключить' }}
        </button>
    </div>
</template>

<style scoped>
.rate-info{
    display: flex;
    flex-direction: column;
    
}
.rate-title{
    color: var(--color-text-dim);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
}
.rate-cost{
    margin-bottom: 31px;
    font-size: 28px;
    font-weight: 500;
}
.rate-cost .text-lg{
    color: var(--color-text-grey);
    font-size: 18px;
    font-weight: 700;
}
.rate-btn{
    width: 100%;
    padding: 15px 28px;
    font-size: 14px;
    font-weight: 600;
    background: var(--color-background-soft);
    border-radius: var(--radius-xsm);
}
.rate-btn.active{
    color: var(--color-text-grey);
    cursor: default;
}

.rate-advantages{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.rate-advantage{
    display: flex;
    align-items: flex-start;
    gap: 16px;
}
.rate-advantage p{
    color: var(--color-text-grey);
    font-size: 14px;
    font-weight: 500;
    margin: 0;
}
</style>