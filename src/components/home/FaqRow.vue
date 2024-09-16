<template>
    <div 
        class="accordion-block"
        :class="{'active' : show}"
        ref="accordion"
        @click="toggleAbout"
    >

        <div class="num-col">
            0{{ number }}
        </div>
        <div class="content-wrap">
            <div class="label-row">
                <span>
                    {{ label }}
                </span>
                <button>
                    <IconPlus/>
                </button>
            </div>

            <div class="accordion-content" v-html="text"></div>
        </div>
        <!-- <div></div>
        <div class="accordion-preview">
            <label>
                {{ label }}
            </label>
            <div class="accordion-more-btn">
                <IconPlus/>
            </div>
        </div>
        <div class="accordion-content">
            {{ text }}
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconPlus from '@/components/icons/IconPlus.vue';

const accordion = ref<HTMLElement>()
const show = ref<boolean>(false)

defineProps<{
    number : number
    label : string
    text : string
}>()

function toggleAbout() {
    if (accordion.value) {
        if (!show.value) {
            const height = accordion.value.querySelector('.accordion-content')?.clientHeight
            if (height) {
                accordion.value.style.height = height + 116 + 'px';
            }
        }
        else{
            accordion.value.removeAttribute('style');
        }
        show.value = !show.value
    }
}

</script>

<style scoped>

.num-col{
    color: #E04887;
    font-size: 35.5px;
    font-weight: 700;
}
.content-wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.label-row{
    display: flex;
    justify-content: space-between;
    color: #D2D2D2;
    font-weight: 700;
    font-size: 22px;
    width: 100%;
}

.gap-label{
    font-size: var(--font-size-xxl);
    font-weight: 800;
}
.accordion-block {
    height: 106px;
	width: 100%;
	display: flex;
	gap: 32px;
	padding: 32px;
	border-radius: var(--radius-md);
	box-shadow: var(--box-shadow-common);
    transition: height 0.2s ease-out, background 0.2s ease-out;
    will-change: height background;
    overflow: hidden;
}
.accordion-block.active{
    background: #1B1E1E;
}

button{
    background: #1B1E1E;
    width: 35.5px;
    aspect-ratio: 1;
    border-radius: 50%;
}
.accordion-block.active button{
    background: #222525;
    rotate: -45deg;
}

.accordion-preview {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

label {
	color: var(--color-text);
	font-size: var(--font-size-md);
	font-weight: 600;
}

.accordion-more-btn{
    display: flex;
    align-items: center;
    gap: 16px;
}
.accordion-gap{
    transition: rotate 0.2s ease-out;
}
.accordion-content {
	display: flex;
    flex-direction: column;
    color: #737373;
    font-size: 16px;
    opacity: 0;
}
.active .accordion-content {
    opacity: 1;
}
.accordion-content ul, .accordion-content p{
    margin-bottom: var(--font-size-md);
}

</style>