<script setup lang="ts">
import { computed, ref, watch, onMounted, type CSSProperties, reactive, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';

import editorHeader from '@/components/editor/editorHeader.vue';
import editorAiButton from '@/components/editor/editorAiButton.vue';
import editorSlidesLoop from '@/components/editor/editorSlidesLoop.vue';
import editorSlidePage from '@/components/editor/editorSlidePage.vue';
import slideContext from '@/components/editor/slideContext.vue';

import { type Presentation, type PresentationObject } from "@/types/Presentation";

import { useUserStore } from "@/stores/user";

import { useNotificationStore } from '@/stores/notification';

import { usePresentationStore } from "@/stores/presentation";
const presentationStore = usePresentationStore()

import LimitedStack from "@/composables/LimitedStack";

const { 
    getProjectById, 
    parsePresentationStyles, 
    setPresentation, 
    saveProject, 
} = presentationStore

const { activePresentation, activeSlideIndex} = storeToRefs(presentationStore)

activeSlideIndex.value = 0;
const projectId = router.currentRoute.value.params.id.toString()

interface EditorState {
    presentation : Presentation | null | Ref
    loading : boolean,
    error : string | null,
}

const editorState = reactive<EditorState>({
    presentation : activePresentation,
    loading : false,
    error : null,
})

const slideContextState = reactive({
    show : false,
    x : 300,
    y : 300,
    slideIndex: 0
})

const openSlideContext = (event:MouseEvent, index:number) => {
    console.log(event);
    slideContextState.x = event.clientX
    slideContextState.y = event.clientY
    slideContextState.slideIndex = index
    slideContextState.show = true;
}

const getPresentationTitle = computed((): string => editorState.presentation?.title ? editorState.presentation.title : 'Untitled')

const presentationStyle = ref<CSSProperties>({})


const slidePageContainer = ref<HTMLElement>()
// const activeSlideIndex = ref<number>(0);


const slidePageScaleCoefficient = ref<number>(1)

async function getActiveProject() {
    editorState.loading = true;
    let isSetted
    try {
        console.log('id: ' + projectId);   
        const response = await getProjectById(projectId)

        if (typeof response == 'number') {
            if (response == 403) {
                router.push({name: 'projects'})
                useNotificationStore().showNotification('Это не ваш проект!', 'error')
            }
            return
        }
        
        if (typeof response !== 'undefined') {
            
            isSetted = setPresentation(response)
            if (!isSetted && editorState.presentation) {
                presentationStyle.value = parsePresentationStyles(editorState.presentation)
            }
        }
    } catch (error:any) {
        editorState.error = error.message || 'Неизвестная ошибка';
    } finally {
        editorState.loading = false;
    }
}

onMounted( async () => {
    
    if (projectId != "test" && projectId != "new") {
        getActiveProject()
    }
    else{
        presentationStyle.value = parsePresentationStyles(editorState.presentation)
    }

    if (slidePageContainer.value) {
        slidePageScaleCoefficient.value = slidePageContainer.value.offsetWidth / 1920
    }

})

// дописать ctrl+z и ctrl+y для истории

const history = new LimitedStack<Presentation>(20)

watch(editorState, () => {

    if (editorState.presentation) {
        console.log('Пересчёт стилей');
        presentationStyle.value = parsePresentationStyles(editorState.presentation)

        history.push(editorState.presentation)

    }
})


async function savePresentation() {
    console.log('созранение презентации');

    editorState.presentation.date_edited = Date.now();

    localStorage.setItem('activePresentationObject', JSON.stringify(editorState.presentation))

    await saveProject({
        id : Number(projectId), 
        author : useUserStore().currentUser.id, 
        title : getPresentationTitle.value,
        json : editorState.presentation
    })

    useNotificationStore().showNotification('Проект "'+getPresentationTitle.value+'" <br>успешно сохранён!', 'success')
}

</script>

<template>

    <div class="editor-page">

        <editor-header 
            :presentation-name="getPresentationTitle" 
            @edit-title="(title) => editorState.presentation.title = title"
        />

        <!--  -->
        <!-- <pre :style="{color: 'lightgreen'}">
            {{ saved }}
        </pre> -->
        <!--  -->

        <div class="editor-workspace">
            <div class="editor-container">

                <div v-if="editorState.loading">Loading</div>
                <!-- :active-slide-index="activeSlideIndex" -->
                <!-- @toggle-active-slide="(index: number) => activeSlideIndex = index"  -->
                <editor-slides-loop 
                    v-else-if="editorState.presentation"
                    :presentation-style="presentationStyle" 
                    :slide-previews="editorState.presentation.slides"
                    @slide-context="(event, index) => openSlideContext(event, index)"
                />
                <div class="slide-view">
                    <div class="slide-view__container" style="max-width: 1440px;" ref="slidePageContainer">
                    <!-- <div class="slide-view__container" style="max-width: 1920px; scale: 0.8;" ref="slidePageContainer"> -->

                        <div v-if="editorState.loading">Loading</div>

                        <template 
                            v-else-if="editorState.presentation"
                            v-for="(slide, index) in editorState.presentation.slides" 
                            :key="index"
                        >
                            <editor-slide-page 
                                v-if="index == activeSlideIndex && slide" 
                                :presentation-style="presentationStyle" 
                                :slide="slide"
                                :scale-coefficient="slidePageScaleCoefficient"
                                @slide-context="(event) => openSlideContext(event, index)"
                                :project-theme-properties="editorState.presentation.theme"
                            />
                        </template>


                    </div>
                </div>
                
            </div>
        </div>

        <slideContext 
            v-if="slideContextState.show"
            :x="slideContextState.x"
            :y="slideContextState.y"
            :slide-index="slideContextState.slideIndex"
            @hide="slideContextState.show = false"
        />

        <editor-ai-button 
            @click="savePresentation"
        />

    </div>
</template>

<style scope>
.editor-page {
    color: #ffffff;
    height: 100vh;
    background: var(--c-black);
}

.editor-page * {
    transition: none;
}

/* editor */
.editor-workspace {
    padding-top: 88px;
}

.editor-container {
    padding-left: 24px;
    display: flex;
}

/* editor */

.slide-view {
    width: 100%;
    padding-top: 32px;
}

.slide-view__container {
    /* width: 400px; */
    width: 100%;
    aspect-ratio: 16/9;
    margin: 0 auto;
}
</style>