<script setup lang="ts">
import { onMounted, ref, type CSSProperties, reactive } from "vue";
import AppSlidePreview from "@/components/AppSlidePreview.vue";

import ProjectContextMenu from '@/components/workspace/ProjectContextMenu.vue';
import LoadingIconBlock from '@/components/icons/LoadingIconBlock.vue';

import type { Presentation, PresThemeOptions, Slide } from '@/types/Presentation';
import { usePresentationStore } from '@/stores/presentation';
import { useNotificationStore } from "@/stores/notification";
// import { useContextStore } from '@/stores/contextMenu'
import { removePresentation } from "@/api/removePresentation";

import { useContextState } from "@/composables/context/useContextState";

const { openInEditor, getProjectById, parsePresentationStyles } = usePresentationStore()
const { showNotification } = useNotificationStore()
// const { showProjectContext } = useContextStore()



const props = defineProps<{
    projectId : number,
    userName : string
}>()

const emit = defineEmits<{
    (event : 'projectToRemoved', id : number) : void
    (event : 'removeProject', id : number) : void
    (event : 'backFromRemoved', id : number) : void
    (event : 'toggleFavouriteStatus', id : number) : void
}>()

interface ProjectItemState {
    presentation : Presentation | null
    titleEditing : boolean
    loading : boolean
    error : string | null
}

const projectItemState = reactive<ProjectItemState>({
    presentation : null,
    titleEditing : false,

    loading : false,
    error : null,
})

const previewWrap = ref<any>(null)
const slide = ref<Slide>()
const scaleCoeffcient = ref<number>(0.19)
const prStyle = ref<CSSProperties>({})

const projectTheme = ref<PresThemeOptions>()

import useTime from '@/composables/useTime';

const { timeSince } = useTime()


async function fetchProject(id:number) {
    projectItemState.loading = true;
    try {
    const response = await getProjectById(id)
    if (response && typeof response !== 'number') {
        projectItemState.presentation = response.json
        // prStyle.value = parsePresentationStyles(response.json)
        projectTheme.value = response.json.theme 
        slide.value = response.json.slides[0]
    }
    } catch (error:any) {
        projectItemState.error = error.message || 'Неизвестная ошибка'
    } finally {
        projectItemState.loading = false
    }
}

async function removeProject(id:number) {
    if(!projectItemState.presentation?.removed){
        console.log('Перемещаю в удалённое')
        emit("projectToRemoved", id)
        return
    }
    console.log('удаление');
    if (confirm('Вы точно хотите безвозвратно удалить проект?')) {
        projectItemState.loading = true;
        try {
            const response = await removePresentation(id)
            if (response == true) {
                showNotification('Проект удалён', 'success')
                emit("removeProject", id)
            }
        } catch (error:any) {
            projectItemState.error = error.message || 'Неизвестная ошибка'
            showNotification('Ошибка удаления', 'error')
        } finally {
            projectItemState.loading = false
        }
    }
    
}

const context = useContextState(280, 420, 'absolute')

onMounted(async () => {
    scaleCoeffcient.value = previewWrap.value.offsetWidth / 1920
    fetchProject(props.projectId)
})


</script>

<template>
    <div class="project-block-item" :data-project-id="projectId" @contextmenu.prevent="context.open($event)">

        <button class="removeBtn" @click.prevent="removeProject(projectId)">
            <icon-close/>
        </button>

        <div class="project-preview__wrap" ref="previewWrap" @click="openInEditor(projectId)">

            <template v-if="projectItemState.loading">

                <LoadingIconBlock 
                    v-if="projectItemState.loading" 
                    :size="9" 
                    style="translate: 0 -28px;"
                />

            </template>

            <template v-else>

                <app-slide-preview 
                    v-if="projectTheme && slide"
                    :scale-coefficient="scaleCoeffcient"
                    :slide="slide"
                    :preview-style="prStyle"
    
                    :project-theme-properties="projectTheme"
                />

                <span v-else-if="projectItemState.error">{{ projectItemState.error }}</span>
            </template>

        </div>

        <div class="project-name" @click="openInEditor(projectId)">
            {{ projectItemState.presentation?.title || 'Загрузка'  }}
        </div>

        <div class="project-info">
            {{ userName }} · {{ projectItemState.presentation ? timeSince(projectItemState.presentation.date_edited) : '18 часов назад' }}
        </div>
         
        <!-- :x="context.x.value"
        :y="context.y.value" -->
        <project-context-menu
            v-if="context.show.value"
            :key="'context-for-'+projectId"
            :project-id="projectId"
            :style="context.positionCSS()"

            :favourite="projectItemState.presentation?.favourite"
            :removed="projectItemState.presentation?.removed"

            @back-from-removed="emit('backFromRemoved', projectId)"
            @toggle-favourite-status="emit('toggleFavouriteStatus', projectId)"
            @remove="removeProject(projectId)"
            @hide="context.show.value = false"
        />
    </div>

</template>

<style scoped>

.project-block-item {
    width: 369px;
    position: relative;
    cursor: default;
}
.removeBtn{
    position: absolute;
    right: 0;
    bottom: 20px;
    margin: 8px;
    z-index: 1;
    background: transparent;
    font-size: 18px;
    scale: 1 .9;
    opacity: 0;
}
.project-block-item:hover .removeBtn {
    opacity: 1;
}
.removeBtn:hover{
    color: var(--color-accent);
}
.project-preview__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: var(--color-background-soft);
    aspect-ratio: var(--presentation-ratio);
    display: flex;
    justify-content: center;
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: 16px;
    cursor: pointer;
}

.project-preview__wrap>img {
    height: 100%;
    width: auto;
}

.project-name {
    color: var(--color-text);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    width: fit-content;
    cursor: pointer;
}

.project-block-item:hover .project-name{
    color: var(--color-accent-light);
}

.project-info {
    font-size: 14px;
    color: var(--color-text-dim);
}

/* project items */
</style>