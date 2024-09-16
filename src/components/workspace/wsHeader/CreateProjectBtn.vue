<template>
    <button 
        class="create-project-btn theme-gradient"
        @click="openDialog"
        title="Создать новый проект"
    >
        <icon-exclude />
        Создать презентацию
    </button>
</template>

<script lang="ts" setup>

import { useDialogStore } from "@/stores/dialog";
import IconExclude from '@/components/icons/IconExclude.vue';
const { openDialog } = useDialogStore()

</script>
