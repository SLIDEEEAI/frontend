<template>
    <toolPanelContext>
        <span>Добавить слайд</span>
        <div class="slide-templates">
            <div class="slide-templates-item" @click="emit('addTemplate', 'common')">
                <img src="@/image/templatePreviews/frame408.png" >
            </div>
            <div class="slide-templates-item" @click="emit('addTemplate', 'textFW')">
                <img src="@/image/templatePreviews/frame409.png" >
            </div>
            <div class="slide-templates-item" @click="emit('addTemplate', 'textWithPictureFW')">
                <img src="@/image/templatePreviews/frame410.png" >
            </div>
        </div>
    </toolPanelContext>
</template>

<script lang="ts" setup>
import toolPanelContext from './toolPanelContext.vue';
import { type TemplateName } from "@/stores/templates/types/slideTemplate";

const emit = defineEmits<{
    (e : 'addTemplate', name : TemplateName) : void
}>()

</script>

<style scoped>

.slide-templates{
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
.slide-templates-item{
    cursor: pointer;
}

</style>