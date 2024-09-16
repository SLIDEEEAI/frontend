<template>
    <section class="themes-section">
        <div class="container">
            <h2>Cоздайте презентацию <br>прямо сейчас</h2>
            
            <div class="themes-wrap">

                <div class="themes-wrap-item">
                    Про птиц средней полосы
                </div>
                <div class="themes-wrap-item">
                    Кибербезопасность: угрозы и защита
                </div>
                <div class="themes-wrap-item">
                    Инновации в образовании: современные методы 
                </div>
                <div class="themes-wrap-item">
                    Коллайдер
                </div>

                <div class="themes-wrap-item">
                    Искусственный интеллект и его влияние <br>на будущее человечества. 
                </div>
                <div class="themes-wrap-item">
                    Скорость математических <br>машин и алгоритмов
                </div>
                <div class="themes-wrap-item">
                    Робототехника: последние достижения и перспективы. <br>Технологии блокчейн и их влияние на финансовую систему.
                </div>

                <div class="themes-wrap-item">
                    Здоровый образ жизни: <br>принципы и практики <br>поддержания здоровья
                </div>
                <div class="themes-wrap-item">
                    Социальная ответственность бизнеса: как <br>компании могут влиять на общество и <br>окружающую среду.
                </div>
                <router-link :to="{name : 'workspace'}" class="themes-wrap-item theme-gradient hoverable">
                        Удивить презентацией
                        <IconArrowLong :direction="'left'" />
                </router-link>

            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>

import IconArrowLong from '@/components/icons/IconArrowLong.vue';

</script>

<style scoped>
.themes-section{
    background: linear-gradient(180deg, #181D1D 0%, #222525 100%);
}
h2{
    font-size: 58px;
    font-weight: 700;
    line-height: 61.19px;
    margin-bottom: 80px;
    text-transform: uppercase;
}
.themes-wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 25px 20px;
}
.themes-wrap-item:not(a){
    color: var(--color-text-op);
    padding: 12px 40px;
    font-weight: 500;
    flex-grow: 1;
    background-color: #0F11115C;
    border-radius: var(--radius-xsm);
}
.theme-gradient{
    color: var(--color-text);
    font-weight: 700;
    font-size: 24px;
    padding: 12px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: var(--radius-xsm);
    width: 100%;
    max-width: 617px;
}
</style>