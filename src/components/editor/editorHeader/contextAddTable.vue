<template>
    <toolPanelContext>

        <div class="add-table-context-title">
            <span>Добавить таблицу</span>
            <span class="table-ceils-x">{{ activeCeil.title }}</span>
        </div>
        
        <div class="select-table-area" @mouseleave="activeCeil.row = 0; activeCeil.ceil = 0; activeCeil.title = ''">
            <div class="select-table-area-row"
                v-for="rowIndex in maxRows" 
                :key="rowIndex"
            >
                <div class="select-table-area-ceil"
                    v-for="ceilIndex in maxCols" 
                    :key="ceilIndex"
                    :class="{'active' : rowIndex <= activeCeil.row && ceilIndex <= activeCeil.ceil}"
                    @mouseenter="enterCeil(rowIndex, ceilIndex)"
                    @click="addTable(rowIndex, ceilIndex)"
                ></div>
            </div>                    
        </div>

    </toolPanelContext>
</template>

<script lang="ts" setup>
import toolPanelContext from './toolPanelContext.vue';

import { usePresentationStore } from '@/stores/presentation';
import { reactive } from 'vue';
const { activeSlideIndex, addEmptyTable } = usePresentationStore()

const emit = defineEmits<{
    (event : 'hide') : void
}>()

const maxRows = 5
const maxCols = 5

const activeCeil = reactive({
    row : 0,
    ceil : 0,
    title : ''
})

const enterCeil = (row : number, ceil : number) => {
    activeCeil.row = row
    activeCeil.ceil = ceil
    activeCeil.title = row+'x'+ceil
}

function addTable(rows:number, ceils : number) {

    const tableRow = new Array<string>(ceils).fill('');
    const bodyRows = new Array<string[]>(rows-1).fill(tableRow);


    addEmptyTable(activeSlideIndex, {
        width : ceils * 100 +'px',
        height : rows * 28 +'px',
        top : '40px',
        left : '1280px',
        background_color : null,
        font_size : 28,
        columns : tableRow,
        rows : bodyRows
    })
}


</script>

<style scoped>

.add-table-context-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.gen-picture-btn{
    font-size: 20px;
    font-weight: 700;
    height: 48px;
    padding-right: 16px;
    padding-left: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--radius-common);
}
.table-ceils-x{
    color: var(--c-text-white-dim);
    font-weight: 400;
    letter-spacing: 2px;
}

.select-table-area{
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.select-table-area-row{
    display: flex;
    gap: 8px;
}
.select-table-area-ceil{
    width: 100%;
    height: 26px;
    border-radius: 3px;
    background: var(--color-background-mute);
    transition: 0.1s background linear;
    cursor: pointer;
}
.select-table-area-ceil.active{
    background: var(--color-background);
}
</style>