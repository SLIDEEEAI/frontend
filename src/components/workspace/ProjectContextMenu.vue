<script lang="ts" setup>
import { usePresentationStore } from '@/stores/presentation';
import { onMounted, ref } from 'vue';
const { openInEditor, openInNewTabEditor } = usePresentationStore()

defineProps<{
    projectId : number,
    favourite ?: boolean,
    removed ?: boolean
}>()

const emit = defineEmits<{
    (event : 'replaceItem') : void
    (event : 'toggleFavouriteStatus') : void
    (event : 'backFromRemoved') : void
    (event : 'remove') : void
}>()

const key = ref(Math.floor(Math.random()*1000))

onMounted(() => {
  console.log('Меню примонтировал') 
})

</script>

<template>
    <!-- :style="{left : x + 'px', top : y + 'px'}" -->
    <div 
        class="contextMenu"
        @contextmenu.stop
        :key="key+'PrCM'"
        @click="key++"
    >
        <div class="projectContextMenu">
            <div class="contextMenuBlock">
                <div class="contextMenuItem" @click="openInEditor(projectId)">
                    Открыть
                </div>
                <div class="contextMenuItem" @click="openInNewTabEditor(projectId)">
                    Открыть в новой вкладке
                </div>
                <div class="contextMenuItem" @click="emit('toggleFavouriteStatus')">
                    {{ favourite ? 'Удалить из избранного' : 'Добавить в избранное' }}
                </div>
                <div class="contextMenuItem">
                    Переместить
                </div>
            </div>
            <hr>
            <div class="contextMenuBlock">
                <div class="contextMenuItem">
                    Копировать ссылку
                </div>
                <div class="contextMenuItem">
                    Поделиться
                </div>
            </div>
            <hr>
            <div class="contextMenuBlock">
                <div class="contextMenuItem">
                    Переименовать
                </div>
                <div v-if="removed" class="contextMenuItem" @click="emit('backFromRemoved')">
                    Вернуть из удалённого
                </div>
                <div class="contextMenuItem" :class="{'muteColor' : removed}" @click="emit('remove')">
                    Удалить
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @keyframes show{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .muteColor{
        color: rgba(255, 255, 255, 0.6);
    }
    .contextMenu{
        min-width: 230px;
        color: var(--color-text);
        position: fixed;
        padding: 16px;
        background: var(--color-background-soft);
        border-radius: var(--radius-sm);
        font-size: 14px;
        line-height: 19px;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transition: none;
        animation: show 0.1s ease-out 0.1s forwards;
        
    }
    .projectContextMenu{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .contextMenuBlock{
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: fit-content;
    }
    .contextMenuItem{
        display: block;
        border-radius: 4px;
        padding: 7px 8px;
        background: transparent;
        cursor: pointer;
    }
    .contextMenuItem:hover{
        background: var(--color-accent);
    }
    hr{
        height: 0;
        border: 0;
        border-top: 2px solid var(--color-background);
    }
</style>