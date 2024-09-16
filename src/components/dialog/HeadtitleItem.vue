<template>
    <div class="headtitle-item">
        <input type="text" 
            :value="titleText"
            @input="changeHeadtitle($event.target)"
        >
        <div class="btns">
            <!-- <icon-edit width="18px" height="18px"/> -->
            <icon-drag-row class="handle" width="18px" height="18px"/>
            <icon-close width="18px" height="18px" @click="emit('removeHeadtitle', index)"/>
        </div>
    </div>
</template>

<script lang="ts" setup>


defineProps<{
    titleText : string,
    index : number
}>()

const emit = defineEmits<{
    (event : 'changeHeadtitle', text : string) : void,
    (event : 'removeHeadtitle', index : number) : void
}>()

const changeHeadtitle = (target : any) => emit('changeHeadtitle', target.value)

</script>

<style scoped>

.headtitle-item{
    position: relative;
    padding: 18px 0;
    padding-left: 32px;
    font-size: 16px;
    font-weight: 700;
    border-radius: var(--radius-xsm);
    background: var(--color-background);
    box-shadow: 0px 6px 0.9px -4px rgba(88, 88, 88, 0.58);
    caret-color: var(--color-accent);
    caret-shape: underscore;
}
.headtitle-item input {
    background: transparent;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    width: calc(100% - 80px);
}

.headtitle-item input:focus-visible{
    outline: none;
}
.headtitle-item .btns{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: fit-content;
    margin: auto 0;
    margin-right: 15px;
    display: flex;
    gap: 16px;
    z-index: 1;
}
.headtitle-item .btns img{
    width: 18px;
    height: 18px;
}

</style>