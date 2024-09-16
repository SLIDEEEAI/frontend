<template>
    <dialog-step>

        <dialog-message :from="'system'">
            <template v-slot:text>
                Выберите количество слайдов или <br>напишите свой вариант
            </template>
            <template v-slot:attachments>
                
                <div class="examples-pool">
                    <div 
                        v-for="(num, index) in slidesNumVariants" :key="index"
                        class="slides-num-example"
                        @click="$emit('selectSlidesNum', num )"
                    >
                        {{ num }}
                    </div>
                </div>

            </template>
        </dialog-message>

        <dialog-message :from="'user'" v-if="num" :editable="true" @edit="$emit('editSlidesNum')">
            <template v-slot:text>
                {{ getSlideString(num) }}
            </template>
        </dialog-message>

    </dialog-step>
</template>

<script lang="ts" setup>

import DialogStep from '../DialogStep.vue';
import DialogMessage from '../DialogMessage.vue';

defineProps<{
    num : number
}>()

defineEmits<{
    (e : 'selectSlidesNum', num : number) : void,
    (e : 'editSlidesNum') : void
}>()

const slidesNumVariants = [ 5, 7, 10, 15, 20 ]

function getSlideString(num: number): string {
  if (num % 100 >= 11 && num % 100 <= 20) {
    return `${num} слайдов`;
  } else if (num % 10 === 1) {
    return `${num} слайд`;
  } else if (num % 10 >= 2 && num % 10 <= 4) {
    return `${num} слайда`;
  } else {
    return `${num} слайдов`;
  }
}

</script>

<style scoped>

.examples-pool {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    max-width: 591px;
}

.slides-num-example {
    background-color: var(--color-background-mute);
    padding: 4px 24px;
    color: var(--color-text);
    font-size: 14px;
    line-height: 26px;
    font-weight: 400;
    border-radius: var(--radius-xsm);
    cursor: pointer;
    outline: 1px solid transparent;
}

.slides-num-example:hover {
    outline-color: var(--color-accent-light);
}


</style>