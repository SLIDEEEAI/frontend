<script setup lang="ts">
import router from '@/router';
import { computed, ref } from 'vue';

    interface Props {
        to : string
        blank ?: boolean 
        light ?: boolean
    }

    const props = defineProps<Props>()

    const isGrabbing = ref<boolean>(false)
    const swiperWidth = ref<number>(118)
    const startPosX = ref<number>(0)
    const grabPosX = ref<number>(0)
    const grabDistance = computed(()=> grabPosX.value - startPosX.value)

    const swiprBtn = ref<any>()

    const beginGrabbing = ( x : number ) => {
        isGrabbing.value = true
        startPosX.value = x

        window.addEventListener('mousemove', grabLinkBtn )
        window.addEventListener('mouseup', endGrabbing, { once: true} )
    }



    function grabLinkBtn ( event : MouseEvent ) {
        // console.log(event.clientX);
        grabPosX.value = event.clientX
    }

    const endGrabbing = () => {
        isGrabbing.value = false
        // console.log('конец граба');
        window.removeEventListener('mousemove', grabLinkBtn )
        
        if (grabDistance.value > 300) {
            // console.log('переход по ссылке');
            if (props.blank) {
                window.open(props.to);
            }
            else{
                router.push({name: props.to })
            }
        }
        // else{
        startPosX.value = 0
        grabPosX.value = 0
        // }
    }

    // onMounted(()=>{
    //     console.log(swiprBtn);
    // })

</script>

<template>
    <div 
        class="swipe-link theme-block" 
        :class="{ 'light' : light }"
        >
        <!-- @mousemove="grabbing($event.clientX)"
        @mouseup="endGrabbing()" -->
        <div 
            class="swipe-btn" 
            :class="{'grabbing' : isGrabbing}"
            ref="swiprBtn"
            :style="`width: ${swiperWidth + grabDistance}px;`"
            @mousedown="beginGrabbing($event.clientX)"
        ></div>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style>
.swipe-link{
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    background-color: #00000070;
    padding-right: 64px;
    border-radius: var(--border-radius-xl);
    width: 495px;
    height: 66px;
    overflow: hidden;
}
.swipe-btn{
    /* width: 118px; */
    min-width: 118px;
    max-width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
    background-color: #C42AB9;
    background-image: url(@/image/icons/button-slide.png);
    background-size: auto 100%;
    background-position: right;
    background-repeat: no-repeat;
    border-radius: var(--border-radius-xl);
    transition: width 0.15s ease;
    cursor: grab;
    will-change: width;
}
.swipe-btn.grabbing{
    transition: none !important;
}
.swipe-btn:active{
    cursor: grabbing;
}
.swipe-link span{
    font-family: var(--rubik-f);
    color: var(--grey-text);
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    pointer-events: none;
    -moz-user-select: none; 
    -webkit-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
}

.swipe-link.light{
    background-color: var(--bg);
}
.swipe-link.light a{
    color: #FFFFFF;
}

</style>