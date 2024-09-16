<template>

    <ContentBox
        :box-index="boxIndex"
        :slide-index="slideIndex"
        :scale-coefficient="scaleCoefficient"
        :content-type="'PictureBox'"
        :params="contentBlockState"
    >

        <div class="content-box picture-box" >

            <template v-if="pictureBox.url">
                <img :src="correctUrl(pictureBox.url.toString())">
            </template>

            <template v-else>
                <span>Добавить изображение</span>
                <div class="add-img-btns-wrap">
                    <div class="add-img-btn add-local">
                        Вставить ссылку
                    </div>
                    <div class="add-img-btn add-url">
                        С устройства
                        <input type="file" @change="addImageFromDevice($event)">
                    </div>
                    <div class="add-img-btn add-genered">
                        Генерация
                    </div>
                </div>
            </template>

        </div>
    </ContentBox>
    

</template>

<script setup lang="ts">
import ContentBox from '@/components/editor/contentBox.vue';

import { onMounted, reactive } from 'vue';
import type { PictureBox } from '@/types/Presentation';

import { usePresentationStore } from "@/stores/presentation";


const { 
    getWithoutPx
} = usePresentationStore()

const emit = defineEmits<{
    (e: 'addImageFromDevice', path : any) : void
}>()

const props = defineProps<{
    boxIndex : number
    slideIndex : number
    scaleCoefficient : number

    editable ?: boolean,

    pictureBoxObject : PictureBox
}>()


const pictureBox = props.pictureBoxObject;


const contentBlockState = reactive({
    left : getWithoutPx(pictureBox.left),
    top : getWithoutPx(pictureBox.top),
    width : getWithoutPx(pictureBox.width),
    height : getWithoutPx(pictureBox.height)
})

// interface State {
//     bold : boolean | null
//     italic : boolean | null
//     lineThrough : boolean
//     underline : boolean
//     align : AlignType
//     type : TextType | null
//     color : RGBcolor | null
//     fontSize: number | null
// }

// const styleState = reactive<State>({
//     // backgroundColor: textBox.background_color,
//     type: textBox.type,
//     fontSize: textBox.font_size,
//     bold: textBox.bold,
//     italic: textBox.italic,
//     align: textBox.align,
//     underline: textBox.underline || false,
//     lineThrough : textBox.lineThrough || false,
//     color : textBox.color || [0,0,0]
// })


const correctUrl = (url:string) : string => {
    switch (pictureBox.type) {
        case 'data':
            return url
        case 'url':
            return url
        // case 'localSrc':
        //     return 'https://slideeeeeee.ru'+ url
        default:
            if ( !url.includes('://') && !url.includes('data:')) {
                return 'https://slideeeeeee.ru'+ url
            }
            else{
                return url
            }
    }
}

const addImageFromDevice = ( e : any ) => {
    const file = (e.target.files || e.dataTransfer.files)[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => emit('addImageFromDevice', reader.result);
        reader.readAsDataURL(file);        
    }
}
onMounted(()=>{

})

</script>

<style scoped>

.content-box{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.drag-container{
    width: 100%;
    height: 100%;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
}
.drag-container:active{
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
}
.resizable.empty .picture-box{
    background: #00000010;
}
.resizable:hover .picture-box,
.picture-box:focus-visible{
    outline-color: var(--color-accent-light);
}

.picture-box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    outline: 3px solid transparent;
    transition: outline-color 0.3s;
    /* cursor: grab; */
}
.picture-box.active{
    cursor: grabbing;
}
.picture-box.hoverActive{
  outline-color: var(--color-accent-light)
}
img{
    height: 100%;
    width: 100%;
}

.resizable.empty .picture-box{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
}


.add-img-btns-wrap{
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    flex-wrap: wrap;
}
.add-img-btn{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 130px;
    height: 80px;
    font-size: 18px;
    border: 2px solid var(--color-background-soft);
    border-radius: var(--radius-sm);
    background: #00000010;
    cursor: pointer;
}
.add-url input{
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
}

</style>
