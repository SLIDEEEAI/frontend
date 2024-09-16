<template>
    <div class="share-context" @click.stop>
        <div class="share-context-block__title">Скачать файл</div>
        <div class="share-context-block">
            <!-- <div class="user-ref-link">
                <button class="copy-link-btn theme-gradient reverse" @click="copyToClipboard(refLink)">
                    pptx
                </button>
                {{ refLink }}
            </div> -->
            <div class="export-block export-pptx">
                <div class="theme-gradient">pptx</div>
                Формат для PowerPoint <icon-download class="download-btn" @click="exportPptx(119)"/>
            </div>
            <div class="export-block export-pdf">
                <div class="theme-gradient">pdf</div>
                Формат PDF <icon-download class="download-btn"/>
            </div>
        </div>
        <div class="splitter"></div>
        <div class="share-context-block__title">Общий доступ</div>
        <div class="share-context-block">

        </div>
        <div class="share-context-block__title">Ссылка для совместной работы</div>
        <div class="share-context-block">

        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { exportPptx } from '@/api/export';

// import { usePresentationStore } from "@/stores/presentation";
// const { removeSlide, dublicateSlide } = usePresentationStore()

const emit = defineEmits<{
    (event:'hide') : void
}>()

function hideOnClick() {
    emit('hide');
    console.log('shareClick');
}
function hideOnKeyDown(e:KeyboardEvent) {
    if (e.key == 'Escape') {
        emit('hide');
        console.log('shareKey');
    }
}

onMounted(() => {
    window.addEventListener('click', hideOnClick)
    window.addEventListener('keydown', hideOnKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('click', hideOnClick)
    window.removeEventListener('keydown', hideOnKeyDown)
})

</script>

<style scoped>

    @keyframes show{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    .share-context{
        position: absolute;
        top: 100%;
        right: 0;
        width: 420px;
        background: var(--color-background-soft);
        border-radius: var(--radius-common);
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
        z-index: 100;
        opacity: 1;
        box-shadow: 0 0 6px #00000070;
        font-size: 14px;
        line-height: 19px;
        cursor: default;
        animation: show 0.2s forwards;
    }
    .share-context-block{
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    .share-context-block__title{
        font-weight: 600;
    }

    .export-block{
        background: var(--color-background);
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        border-radius: var(--radius-xsm);
        overflow: hidden;
    }
    .export-block .theme-gradient{
        width: 56px;
        height: 44px;
        line-height: 44px;
        font-weight: 700;
        margin-right: 16px;
    }
    .download-btn{
        margin-left: auto;
        margin-right: 16px;
        cursor: pointer;
    }
    .splitter{
        background: var(--color-background);
        width: 100%;
        height: 2px;
    }
</style>