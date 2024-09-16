<template>
    <dialog-step>

        <dialog-message :from="'system'">
            <template v-slot:text>
                Как бы вы хотели создать презентацию?
            </template>
            <template v-slot:attachments>
                <div class="attachment-spoiler">
                    Выберите один вариант:
                </div>
                <div class="examples-pool">
                    <div 
                        class="types-example_item"
                        @click="$emit('selectType', 'generate')"
                    >
                        <img src="@/assets/icons/projectCreationType/generate-icon.svg">
                        <span>Сгенерировать презентацию c ИИ</span>
                    </div>
                    <div 
                        class="types-example_item selected"
                        @click="$emit('selectType', 'document')"
                    >
                        <img src="@/assets/icons/projectCreationType/document-icon.svg">
                        <span>Сгенерировать презентацию по тексту</span>
                    </div>
                    <div 
                        class="types-example_item"
                        @click="$emit('selectType', 'empty')"
                    >
                        <img src="@/assets/icons/projectCreationType/empty-project-icon.svg">
                        <span>Начать с пустой презентации</span>
                    </div>
                </div>
            </template>
        </dialog-message>

        <dialog-message :from="'user'" v-if="type" >
            <template v-slot:text>
                {{ typeText(type) }}
            </template>
        </dialog-message>

    </dialog-step>
</template>

<script lang="ts" setup>

import DialogStep from '../DialogStep.vue';
import DialogMessage from '../DialogMessage.vue';
import type { ProjectCreationType } from '@/types/dialog/ProjectCreationType';

defineProps<{
    type : ProjectCreationType | null
}>()

defineEmits<{
    (e : 'selectType', type : ProjectCreationType) : void
}>()

const typeText = (type : ProjectCreationType) => {
    switch (type) {
        case 'generate':
            return 'Сгенерировать презентацию c помощью ИИ';
        case 'document':
            return 'Сгенерировать презентацию по тексту или документу';
        case 'empty':
            return 'Начать с пустой презентации';
        default:
            break;
    }
}

</script>

<style scoped>

.examples-pool {
    display: flex;
    gap: 16px;
}

.attachment-spoiler{
    margin-bottom: 16px;
    font-weight: 600;
    color: var(--color-text-grey);
}
.types-example_item {
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    background-color: var(--color-background-mute);
    padding: 18.5px 32px;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    border-radius: var(--radius-xsm);
    cursor: pointer;
    outline: 1px solid transparent;
}
.types-example_item:hover {
    /* background-color: var(--color-text-grey-dim); */
    outline-color: var(--color-accent-light);
}
/* .types-example_item.selected {

} */


</style>