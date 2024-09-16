<script setup lang="ts">

import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useNotificationStore } from "@/stores/notification";

const { showNotification } = useNotificationStore()
const { userInitials, userLogoUrl } = useUserStore();

import shareContext from '@/components/editor/shareContext.vue';
import toolsPanel from "@/components/editor/editorHeader/toolsPanel.vue";

defineProps<{
    presentationName : string
}>()

const emit = defineEmits<{
    ( event :  "editTitle", newTitle : string) : void
}>()

const isShareContext = ref<boolean>(false)

const showShareContext = () => {
    isShareContext.value = true
    console.log(isShareContext.value);
}

const titleInput = ref<HTMLInputElement | null>(null)

function titleFocusOut(event : KeyboardEvent) {
    if (event.key == 'Enter') {
        if (titleInput.value?.value && titleInput.value?.value.length >= 3) {
            titleInput.value.blur()
        }
        else{
            showNotification('Введите название презентации.<br>Минимум 3 символа.', 'warning')
        }
    }
}

function updateTitle() {
    if (titleInput.value?.value) {
        emit('editTitle', titleInput.value?.value)
    }
}

</script>

<template>
    <header>
        <div class="header_container">

            <div class="header-left">
                <img 
                    class="return-btn"
                    @click="$router.push({name:'projects'})" 
                    src="@/assets/icons/back_arrow_btn.svg" 
                    alt="" style="cursor: pointer;"
                >
                <img src="@/assets/icons/dot_frame.svg" alt="">
                <input 
                    class="project-name"
                    contenteditable="true"
                    @keydown="titleFocusOut($event)"
                    @blur="updateTitle"
                    :value="presentationName || ''"
                    ref="titleInput"
                />
            </div>

            <tools-panel />

            <div class="header-right">

                <button class="share-btn transparent" @click.stop="showShareContext">
                    Поделиться <img src="@/assets/icons/tab_arrow.svg">
                    <shareContext 
                        v-if="isShareContext"
                        @hide="isShareContext = false"
                    />
                </button>

                <button 
                    class="theme-gradient"
                    id="play-prezentation-btn"
                >   
                    Play <img src="@/assets/icons/play_arrow.svg">
                </button>

                <div class="user-avatar__wrap">
                    <img v-if="userLogoUrl" :src="userLogoUrl">
                    <span v-else>{{ userInitials }}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>

header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    z-index: 101;
    background-color: transparent;
}
.header_container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 25px;
}
.header-left{
    display: flex;
    align-items: center;
}
.header-right{
    display: flex;
    align-items: center;
    gap: 16px;
}



.project-name{
    display: inline-block;
    min-width: 280px;
    max-width: 385px;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    color: var(--color-text);
    font-family: var(--Noto-sans);
    border: 0;
    border-bottom: 1px solid transparent;
    padding: 0;
    background: transparent;
    overflow: visible;
}

.project-name:focus{
    outline: 0;
    border-bottom: 1px solid var(--color-accent);
}

#play-prezentation-btn{
    display: flex;
    padding: 12px 12px 12px 16px;
    align-items: center;
    gap: 8px;
    border-radius: var(--radius-common);
}

.user-avatar__wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47px;
    height: 47px;
    font-size: 22px;
    font-weight: 700;
    /* background: var(--color-4); */
    background: linear-gradient(125deg, #9517DA 25%, #C52BB8 50%, #FA615E 75%, #E54294 100%);
    border-radius: 50%;
    overflow: hidden;
    margin-left: 8px;
}

.share-btn{
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-radius: var(--radius-common);
}
.notice-btn{
    position: relative;
}
.notice-btn::before{
    content: '';
    position: absolute;
    right: 6px;
    top: 3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-accent);
    display: none;
    z-index: 1;
}
.notice-btn.hasNotice::before{
    display: block;
}


</style>