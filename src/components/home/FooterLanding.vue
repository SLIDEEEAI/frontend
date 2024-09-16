<template>
    <footer>
        <div class="container">

            <div>
                <img src="@/assets/images/header-logo.png">
                <div class="scroll-up" @click="scrollUp">
                    Вернуться наверх
                    <div class="arrow-btn theme-gradient">
                        <IconArrowLong />
                    </div>
                </div>
            </div>

            <div class="links-wrap">

                <div class="links-block">
                    <router-link :to="{name:'PrivacyPolicy'}">Политика конфиденциальности</router-link>
                    <router-link :to="{name:'UserAgreement'}">Пользовательское соглашение</router-link>
                    <router-link :to="{name:'PersonalData'}">Согласие на обработку персональных данных</router-link>
                    <router-link :to="{name:'RefundPolicy'}">Политика возвратов</router-link>
                    <!-- <a href="">Презентации на основе искусственного интеллекта</a>
                    <router-link :to="{name:'PrivacyPolicy'}">Политика конфиденциальности</router-link>
                    <a href="">Политика использования файлов cookie</a>
                    <a href="">Публичная оферта</a>
                    <a href="">Условия использования</a>
                    <router-link :to="{name:'RefundPolicy'}">Политика возвратов</router-link> -->
                </div>
                <div class="links-block">
                    <!-- <router-link :to="{name:'home'}">Главная</router-link> -->
                    <!-- <router-link to="#rates">Тарифы</router-link> -->
                    <a href="/">Главная</a>
                    <a href="/#rates">Тарифы</a>
                    <a href="/auth/signin">Зарегистрироваться</a>
                    <a href="">Поддержка support@slideee.ru</a>
                    <a href="">Сотрудничество commercial@slideee.ru</a>
                </div>
                <div>
                    <div class="links-block">
                        <a>OOO “СЛАЙДИ”</a>
                        <a>ИНН 7100048746</a>
                        <a>ОГРН 1027700067328</a>
                        <a>Тула, ул. Металлургов, д.60</a>
                    </div>
                    <div class="socials-block">
                        <a href="" target="_blank"><img src="@/image/icons/VK.svg" title="Мы в ВК"></a>
                        <a href="" target="_blank"><img src="@/image/icons/tg.svg" title="Мы в Телеграмм"></a>
                    </div>
                </div>

            </div>

        </div>
    </footer>
</template>

<script lang="ts" setup>

import IconArrowLong from '@/components/icons/IconArrowLong.vue';

const scrollUp = () => document.documentElement.scrollTo({top:0, behavior : 'smooth'})

</script>

<style scoped>

footer{
    background: #1B1E1E;
    padding-top: 32px;
    padding-bottom: 72px;
    color: #A4A3A3;
    font-size: 18px;
}
a{
    color: inherit;
}
.container{
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.container > div{
    display: flex;
    justify-content: space-between;
}
.container > div:first-child{
    align-items: center;
}
.scroll-up{
    display: flex;
    gap: 30px;
    align-items: center;
    cursor: pointer;
}
.arrow-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;
    height: 52px;
    padding: 12px 0px 12px 0px;
    border-radius: 99px;
}
.arrow-btn svg{
    rotate: -90deg;
    width: 28px;
    height: 19px;
}


.links-wrap > div{
    display: flex;
    flex-direction: column;
    gap: 36px;
}
.links-wrap > div:last-child{
    padding-right: 23px;
}
.links-wrap .links-block{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.socials-block{
    display: flex;
    gap: 14px;
}
.socials-block{
    width: 33px;
    aspect-ratio: 1;
}
</style>