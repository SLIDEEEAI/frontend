<script setup lang="ts">
import SwipeLink from "@/components/UI/SwipeLink.vue";

import '../../smart_slide/js/bootstrap.bundle.min.js';
import '../../smart_slide/js/jquery-3.6.0.min.js';
import '../../smart_slide/js/script.js';
import '../../smart_slide/js/swiper-link.js';

</script>

<template>

    <header>
        <div class="container">
            <div class="header-left">
                <a class="logo">
                    <img src="@/image/logo-sm.png" alt="Логотип Smart Slide">
                    <span>Slideee</span>
                </a>
                <ul>
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Сервис</a></li>
                </ul>

            </div>
            <div class="header-rigth">
                <a @click="$router.push({name:'login'})">Вход</a>
                <a @click="$router.push({name:'signin'})"><button class="dark-btn">Регистрация</button></a>
            </div>
        </div>
    </header>

  <section id="main-block">
    <div class="container">
        <h1>Интеллектуальные слайды для вашей презентации</h1>
        <div class="black-block">
            <p class="intro-text">
                <span class="type-text-animation">
                    <!-- Создайте презентацию с помощью искусственного интеллекта за одну минуту... -->
                </span>
                <span id="cursor">|</span>
            </p>
            <a @click="$router.push({name:'projects'})">
                <button class="theme-btn">Создать презентацию</button>
            </a>
        </div>
    </div>
    <div class="gradient-dark"></div>
    <img class="main-layout" src="@/image/layouts/main-layout.png">
    <div class="slideee-block">
        <span>slideee</span>
        <span>slideee</span>
    </div>
</section>


<section id="solutions">
    <div class="container">

        <div>
            <h2>Полный спектр решений</h2>
            <SwipeLink :to="'projects'">
                Попробуйте бесплатно
            </SwipeLink>
        </div>

        <div class="info-blocks-wrap">
            <div class="dark-block active">
                <h3>Генерация презентаций с помощью нейросетей:</h3>
                <p>Наша платформа основывается на многолетнем опыте исследований в области искусственного интеллекта и глубокого обучения. Когда вы вводите промпт, RevPrez активирует свои мощные нейросети для генерации содержания и темы вашей презентации.</p>
                <span class="num-mark">01//</span>
                <img src="@/image/patterns/lines.svg">
            </div>
            <div class="dark-block">
                <h3>Персонализация и редактирование:</h3>
                <p>Мы понимаем, что каждый пользователь уникален и имеет свои предпочтения. Поэтому RevPrez предоставляет возможность полностью настроить сгенерированный контент и внести собственные изменения. Вы можете добавлять, удалять, редактировать слайды, а также изменять оформление и стиль, чтобы презентация полностью соответствовала вашим потребностям и представлениям.</p>
                <span class="num-mark">02//</span>
                <img src="@/image/patterns/lines.svg">
            </div>
            <div class="dark-block">
                <h3>Богатая библиотека медиа-ресурсов:</h3>
                <p>Чтобы ваша презентация была наглядной и захватывающей, мы предлагаем доступ к обширной коллекции изображений, иконок, графиков и видео. Просто выберите подходящие элементы, и RevPrez автоматически интегрирует их в вашу презентацию.</p>
                <span class="num-mark">03//</span>
                <img src="@/image/patterns/lines.svg">
            </div>
            <div class="dark-block">
                <h3>Совместная работа и облачное хранение:</h3>
                <p>Вы можете сотрудничать с коллегами или друзьями, приглашая их на совместное редактирование презентации. Все изменения сохраняются в облаке, что обеспечивает доступ к вашим данным из любой точки мира.</p>
                <span class="num-mark">04//</span>
                <img src="@/image/patterns/lines.svg">
            </div>
        </div>

    </div>
</section>

<section id="howTo">
    <div class="container">
        <h2>Как создать<br> презентацию?</h2>

        <div>
            <div class="dark-opacity-block">
                <span class="num-mark">01//</span>
                <h3>Введите ваш <span class="marked">запрос</span></h3>
                <div>
                    <div class="mark"></div>
                    <p>Напишите любой запрос, а искусственный интеллект Slideee поможет выразить любые Ваши мысли</p>
                </div>
            </div>
            <div class="dark-opacity-block">
                <span class="num-mark">02//</span>
                <h3>Уделите внимание каждому <span class="marked">слайду</span></h3>
                <div>
                    <div class="mark"></div>
                    <p>Редактируйте текст, фон, картинки в презентации самостоятельно или с помощью ИИ</p>
                </div>
            </div>
            <div class="dark-opacity-block">
                <span class="num-mark">03//</span>
                <h3><span class="marked">Скачайте</span> и делитесь</h3>
                <div>
                    <div class="mark"></div>
                    <p>Вы можете экспортировать готовую презентацию в формате pdf или pptx, а также поделиться на нее ссылкой</p>
                </div>
            </div>
        </div>

    </div>
    <img class="layout-line-pattern" src="@/image/patterns/gradient-line.svg">
</section>

<section id="advantages">
    <div class="container flex-column">
        <h2>Наши преимущества</h2>
        <div class="advantages-wrap dark-block">
            <div class="advantage-block active">
                <div class="left">
                    <div class="num-mark gradient-theme">1//</div>
                    <div class="title gradient-theme">
                        <span>Экономия времени</span>
                        <div class="white-layout"></div>
                    </div>
                </div>
                <p>В среднем, создание презентации занимает от 30 до 60 минут. с помощью Slideee вы сможете создать презентацию всего за 1 минуту</p>
            </div>
            <div class="advantage-block">
                <div class="left">
                    <div class="num-mark gradient-theme">2//</div>
                    <div class="title gradient-theme">
                        <span>Качество и креативность</span>
                        <div class="white-layout"></div>
                    </div>
                </div>
                <p>Использование ИИ способствует созданию презентаций с высоким уровнем качества и оригинальным дизайном</p>
            </div>
            <div class="advantage-block">
                <div class="left">
                    <div class="num-mark gradient-theme">3//</div>
                    <div class="title gradient-theme">
                        <span>Простота использования</span>
                        <div class="white-layout"></div>
                    </div>
                </div>
                <p>Благодаря использованию искусственного интеллекта, процесс создания презентаций становится более простым и интуитивным даже для тех, кто не обладает опытом в этой области</p>
            </div>
        </div>
    </div>
</section>



<section id="last-block">
    <div class="container">
        <div class="call-to-action-block">
            <div>
                <h3>Создайте презентацию своей мечты с легкостью и профессионализмом на нашем сайте прямо сейчас!</h3>
                <p>Откройте мир возможностей с нашим инновационным сервисом и впечатлите свою аудиторию неповторимыми выступлениями. </p>
            </div>
            <div>
                <h2>Создать то,<br> что вам нужно<br> - легко</h2>
                <SwipeLink :to="'projects'" :light="true">
                    Попробуйте бесплатно
                </SwipeLink>
            </div>
            <img src="@/image/patterns/diagonal-gradient-line.svg">
        </div>
    </div>
</section>

<footer>
    <div class="container">
        <div class="left">
            <a class="logo" href="index.php">
                <img src="@/image/logo-sm.png" alt="Логотип Smart Slide">
                <span>Slideee</span>
            </a>
            <div class="info">
                <a href="index.php">Презентации на основе искусственного интеллекта</a>
                <a href="index.php">Политика конфиденциальности</a>
            </div>
            <div class="socials">
                <a href="index.php"><img src="@/image/icons/VK.svg" title="Мы в ВК"></a>
                <a href="index.php"><img src="@/image/icons/tg.svg" title="Мы в Телеграмм"></a>
            </div>
        </div>
        <div class="menu">
            <ul>
                <a href="index.php"><li>Главная</li></a>
                <a href="index.php"><li>Тарифы</li></a>
                <a href="index.php"><li>Войти</li></a>
                <a href="index.php"><li>Зарегистрироваться</li></a>
            </ul>
        </div>
        <div class="right">
            <div id="topScroll">
                Вернуться вверх <img src="@/image/icons/button-up.png" title="Вернуться вверх">
            </div>
            <div class="promocode-block">
                <div>
                    <span>Хотите попробовать бесплатно?</span>
                    <span>Возьмите промокод на нашем канале</span>
                </div>
                <img src="@/image/icons/tg-theme.svg">
            </div>
        </div>
      </div>
    </footer>

  </template>

<style scoped>

@import '../../smart_slide/stylesheet/reset.css';
@import '../../smart_slide/stylesheet/bootstrap.min.css';
@import '../../smart_slide/stylesheet/style.css';

@import '../../smart_slide/stylesheet/header_style.css';
@import '../../smart_slide/stylesheet/footer_style.css';

body{
    background: var(--bg) !important;
}

</style>