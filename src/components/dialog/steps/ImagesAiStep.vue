<template>
    <dialog-step>

        <dialog-message :from="'system'">
            <template v-slot:text>
                Какие изображения вставить в вашу презентацию?
            </template>
            <template v-slot:attachments>
                <div class="examples-pool">
                    <div 
                        class="source-example_item"
                        @click="$emit('selectImageSource', 'DALLE-2')"
                    >
                        Сгенерированные нейросетью AI
                    </div>
                    <div 
                        class="source-example_item"
                        @click="$emit('selectImageSource', 'internet')"
                    >
                        Изображения из интернета
                    </div>
                    <TooltipUI 
                        :text="'DALL-E 2 дешевле, но уступает в качестве; DALL-E 3 дороже, но генерирует лучшие изображения'"
                        style="cursor: pointer;"
                    >
                        <icon-explain/>
                    </TooltipUI>
                </div>
            </template>
        </dialog-message>

        <dialog-message :from="'user'" v-if="imageSource" >
            <template v-slot:text>
                {{ imageSource }}
            </template>
        </dialog-message>

    </dialog-step>
</template>

<script lang="ts" setup>

import type { ImageSource } from '@/types/dialog/ImageSource';

import DialogStep from '../DialogStep.vue';
import DialogMessage from '../DialogMessage.vue';
import TooltipUI from '../../UI/TooltipUI.vue'

defineProps<{
    imageSource : ImageSource | null
}>()

defineEmits<{
    (e : 'selectImageSource', imageSource : ImageSource) : void
}>()

</script>

<style scoped>

.examples-pool {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 16px;
    width: 60%;
}

.attachment-spoiler{
    margin-bottom: 16px;
    font-weight: 600;
    color: var(--color-text-grey);
}
.source-example_item {
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

.source-example_item:hover {
    outline-color: var(--color-accent-light);
}


</style>