<script setup lang="ts">

import { ref } from "vue";
import { useNotificationStore } from "@/stores/notification";


const { showNotification } = useNotificationStore()

const refLink = ref<string>('https://www.google.com/search?q=slideee&oq=slideee+&gs_lcrp=EgZjaHJvbW')

interface crediting{
    invitedEmail : string
    date : string
    credit : number

}
const creditingFunds = ref<crediting[]>([
    {invitedEmail : 'darya.shabro@yandex.ru', date : '15.10.2023', credit : 150},
    {invitedEmail : 'darya.shabro@yandex.ru', date : '15.10.2023', credit : 150},
    {invitedEmail : 'darya.shabro@yandex.ru', date : '15.10.2023', credit : 150},
    {invitedEmail : 'darya.shabro@yandex.ru', date : '15.10.2023', credit : 150},
    {invitedEmail : 'darya.shabro@yandex.ru', date : '15.10.2023', credit : 150}
])

async function copyToClipboard(text : string) {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Ссылка скопирована', 'success');
    } catch($e) {
        showNotification('Не удалось скопировать ссылку');
        console.log($e); 
    }
}

</script>

<template>
    <div class="settings-tab ref-tab">

        <div class="settings-tab__block w-100">

            <h3 @click="showNotification('Реферальная');">Реферальная программа</h3>

            <p style="max-width: 566px;">
                Отправляйте ссылку вашим друзьям чтобы получить <span style="color: var(--color-text);">1000 токенов</span><br>
                в 1-ый раз и по 120 все последующие разы.
            </p>

            <div class="user-ref-link">
                {{ refLink }}
                <button class="copy-link-btn theme-gradient reverse" @click="copyToClipboard(refLink)">
                    <icon-copy />
                </button>
            </div>

            <div class="crediting-story-block">
                <div class="crediting-story-row crediting-story-heading">
                    <div>Почта</div>
                    <div>Дата</div>
                    <div>Количество токенов</div>
                </div>
                <div class="crediting-story-body">
                    <div class="crediting-story-row" v-for="(crediting, index) in creditingFunds" :key="index">
                        <div>{{ crediting.invitedEmail }}</div>
                        <div>{{ crediting.date }}</div>
                        <div>+ {{ crediting.credit }} токенов</div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>
.settings-tab__block p{
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    margin: 0 0 32px 0;
    color: var(--color-text-grey);

}

.user-ref-link{
    position: relative;
    background: var(--color-background);
    border-radius: var(--radius-xsm);
    padding-left: 24px;
    height: 52px;
    margin-bottom: 40px;
    color: var(--color-text-grey-dim);
    font-size: 18px;
    font-weight: 500;
    line-height: 52px;
    overflow: hidden;
}
.copy-link-btn{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 10px;
}

.crediting-story-block{

}
.crediting-story-body{
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.crediting-story-row{
    display: flex;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--color-background);
    color: var(--color-text-grey);
    font-size: 16px;
    font-weight: 500;
}
.crediting-story-heading{
    border: none;
    font-weight: 600;
    color: var(--color-text);
    padding-bottom: 0;
    margin-bottom: 32px;
}
.crediting-story-row > div:nth-child(1){
    flex: 270px;
}
.crediting-story-row > div:nth-child(2){
    flex: 33%;
}
.crediting-story-row > div:nth-child(3){
    flex: 33%;
    color: var(--color-text);
}
</style>