<template>
    <dialog-step>

        <dialog-message :from="'system'">
            <template v-slot:text>
                Напишите тему вашей презентации
            </template>
            <template v-slot:attachments>
                <div class="attachment-spoiler">
                    Выберите, чем я могу помочь вам:
                </div>
                <div class="examples-pool">
                    <div 
                        v-for="(theme, index) in generatedThemes" :key="index"
                        class="themes-example_item"
                        @click="$emit('selectTheme', theme)"
                    >
                        {{ theme }}
                    </div>
                </div>
            </template>
        </dialog-message>

        <dialog-message v-if="theme" :from="'user'" :editable="true" @edit="$emit('editTheme')">
            <template v-slot:text>
                {{ theme }}
            </template>
        </dialog-message>

    </dialog-step>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import DialogStep from '../DialogStep.vue';
import DialogMessage from '../DialogMessage.vue';

defineProps<{
    theme : string
}>()

defineEmits<{
    (e : 'selectTheme', text : string) : void
    (e : 'editTheme') : void
}>()

const generatedThemes = ref<string[]>([
    'Лучшие машины 2023 года',
    'Восстание ведьм в Париже во времена испанской чумы',
    'Птицы Азии',
    'Искусство Австралии',
    'Жители Тулы и области'
])
</script>

<style scoped>

.examples-pool {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    width: 60%;
}

.attachment-spoiler{
    margin-bottom: 16px;
    font-weight: 600;
    color: var(--color-text-grey);
}
.themes-example_item {
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

.themes-example_item:hover {
    outline-color: var(--color-accent-light);
}


</style>