<template>
    <section class="promo-section">
        <div class="container">
            <h2>Slideee экономит ваше время</h2>
        
            <div class="steps-pool">
                <div class="step">
                    <div class="text-block">
                        <h4>
                            Уделите внимание каждому <br>
                            <span class="color-accent">
                                слайду
                            </span>
                        </h4>
                        <p>
                            Создавайте профессиональные презентации с помощью нейросети: <br>
                            просто укажите тему, вставьте текст <br>
                            или начните с пустого шаблона
                        </p>
                    </div>
                    <div class="video-block">
                        <video autoplay muted loop>
                            <source src="@/assets/videos/video_promo1-test.mp4">
                        </video>
                    </div>
                </div>
                <div class="step">
                    <div class="text-block">
                        <h4>
                            Уделите внимание каждому <br>
                            <span class="color-accent">
                                слайду
                            </span>
                        </h4>
                        <p>
                            Создавайте профессиональные презентации с помощью нейросети: <br>
                            просто укажите тему, вставьте текст <br>
                            или начните с пустого шаблона
                        </p>
                    </div>
                    <div class="video-block">
                        <video autoplay muted loop>
                            <source src="@/assets/videos/video_promo2-test.mp4">
                        </video>
                    </div>
                </div>
                <div class="step">
                    <div class="text-block">
                        <h4>
                            Уделите внимание каждому <br>
                            <span class="color-accent">
                                слайду
                            </span>
                        </h4>
                        <p>
                            Создавайте профессиональные презентации с помощью нейросети: <br>
                            просто укажите тему, вставьте текст <br>
                            или начните с пустого шаблона
                        </p>
                    </div>
                    <div class="video-block">
                        <video autoplay muted loop>
                            <source src="@/assets/videos/video_promo3-test.mp4">
                        </video>
                    </div>
                </div>
                <div class="step">
                    <div class="text-block">
                        <h4>
                            Уделите внимание каждому <br>
                            <span class="color-accent">
                                слайду
                            </span>
                        </h4>
                        <p>
                            Создавайте профессиональные презентации с помощью нейросети: <br>
                            просто укажите тему, вставьте текст <br>
                            или начните с пустого шаблона
                        </p>
                    </div>
                    <div class="video-block">
                        <video autoplay muted loop>
                            <source src="@/assets/videos/video_promo4-test.mp4">
                        </video>
                    </div>
                </div>
                <div class="step">
                    <div class="text-block">
                        <h4>
                            Уделите внимание каждому <br>
                            <span class="color-accent">
                                слайду
                            </span>
                        </h4>
                        <p>
                            Создавайте профессиональные презентации с помощью нейросети: <br>
                            просто укажите тему, вставьте текст <br>
                            или начните с пустого шаблона
                        </p>
                    </div>
                    <div class="video-block">
                        <video autoplay muted loop>
                            <source src="@/assets/videos/video_promo5.mp4">
                        </video>
                    </div>
                </div>

            </div>
            
        </div>
        <div class="label-pattern">
            <img class="slideee-label" src="@/assets/slideee-label.svg">
        </div>
    </section>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.promo-section{
    box-shadow: inset 0px -148px 169.7px -162px #414141;
}
h2{
    font-size: 58px;
    font-weight: 700;
    line-height: 61.19px;
    margin-bottom: 80px;
    text-transform: uppercase;
}
.steps-pool{
    display: flex;
    flex-direction: column;
    gap: 100px;
    margin-bottom: 150px;
}
.step{
    height: fit-content;
    display: flex;
    justify-content: space-between;
    gap: 115px;
}
.steps-pool > .step:nth-child(2n){
    flex-direction: row-reverse;
}
.text-block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    max-width: 485px;
    padding-right: 30px;
}
.video-block{
    display: flex;
    align-items: center;
    min-height: 456px;
    max-width: 810px;
    overflow: hidden;
    border-radius: var(--radius-md);
}

.video-block video{
    width: 100%;
}

h4{
    font-size: 24px;
    line-height: 31.92px;
    font-weight: 700;
}
p{
    color: var(--color-text-soft);
    font-size: 22px;
    line-height: 23.21px;
}

.slideee-label{
    width: 100%;
    padding-bottom: 12px;
    display: block;
}

</style>