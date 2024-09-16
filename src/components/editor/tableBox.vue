<template>
    
    <ContentBox
        :box-index="boxIndex"
        :slide-index="slideIndex"
        :scale-coefficient="scaleCoefficient"
        :content-type="'TableBox'"
        :params="contentBlockState"
    >

        <div class="content-box table-box" :class="{'preview' : !editable}">

            <!-- <table class="table" contenteditable="true">
                <thead>
                    <th 
                        v-for="columnName, index in tableBox.columns" 
                        :key="'tbl' + boxIndex + 'col' + index"
                    >
                    {{ columnName }}
                    </th>
                </thead>
                <tbody>
                    <tr 
                        v-for="row, rowIndex in tableBox.rows" 
                        :key="'tbl' + boxIndex + 'row' + rowIndex"
                    >
                        <td 
                            v-for="cell, cellIndex in row" 
                            :key="'tbl' + boxIndex + 'row' + rowIndex + 'c' + cellIndex"
                        >
                            {{ cell }}
                        </td>
                    </tr>
                </tbody>
            </table> -->

            <div class="table" ref="table" v-if="tableCeils" @click="tableFocus">
                
                <div class="thead">
                    <div class="thead-row">
                        <input 
                            class="thead-ceil" 
                            v-for="columnName, index in tableCeils[0]" 
                            :key="'tbl' + boxIndex + 'col' + index"
                            :value="columnName"
                            @change="saveCeil(0, index, ($event.target as HTMLInputElement).value)"
                            @focusout="updateTextInTableCeil(activeSlideIndex, boxIndex, 0, index, ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                </div>

                <div class="tbody">
                    <template
                        v-for="row, rowIndex in tableCeils" 
                    >
                        <div class="tbody-row" 
                            :key="'tbl' + boxIndex + 'row' + rowIndex"
                            v-if="rowIndex != 0"
                        >
                            <input class="tbody-ceil" 
                                v-for="cell, cellIndex in row" 
                                :key="'tbl' + boxIndex + 'row' + rowIndex + 'c' + cellIndex"
                                :value="cell"
                                @focusout="updateTextInTableCeil(activeSlideIndex, boxIndex, rowIndex, cellIndex, ($event.target as HTMLInputElement).value)"
                                @change="saveCeil(rowIndex, cellIndex, ($event.target as HTMLInputElement).value)"
                            />
                        </div>
                    </template>
                </div>

                <!-- <div class="thead">
                    <div class="thead-row">
                        <div class="thead-ceil" 
                            v-for="columnName, index in tableBox.columns" 
                            :key="'tbl' + boxIndex + 'col' + index"
                            contenteditable="true"
                        >
                        {{ columnName }}
                        </div>
                    </div>
                </div>
                <div class="tbody">
                    <div class="tbody-row" 
                        v-for="row, rowIndex in tableBox.rows" 
                        :key="'tbl' + boxIndex + 'row' + rowIndex"
                    >
                        <div class="tbody-ceil" 
                            v-for="cell, cellIndex in row" 
                            :key="'tbl' + boxIndex + 'row' + rowIndex + 'c' + cellIndex"
                            contenteditable="true"
                        >
                            {{ cell }}
                        </div>
                    </div>
                </div> -->
            </div>

        </div>
    </ContentBox>

</template>

<script lang="ts" setup>
import ContentBox from '@/components/editor/contentBox.vue';
import type { TableBox } from '@/types/Presentation';

import { usePresentationStore } from "@/stores/presentation";
import { reactive, ref } from 'vue';


const { 
    activeSlideIndex,
    getWithoutPx,
    updateTextInTableCeil,
} = usePresentationStore()


const props = defineProps<{

    boxIndex : number
    slideIndex : number
    scaleCoefficient : number

    editable ?: boolean,

    tableBoxObject : TableBox

}>()

const tableBox = props.tableBoxObject

const contentBlockState = reactive({
    left : getWithoutPx(tableBox.left),
    top : getWithoutPx(tableBox.top),
    width : getWithoutPx(tableBox.width),
    height : getWithoutPx(tableBox.height)
})


const isTableFocus = ref<boolean>(false)
const tableFocus = () => {
    if(!isTableFocus.value){
        console.log('Клик');
        isTableFocus.value = true
        window.addEventListener('click', checkTableFocus)
    }
}
const checkTableFocus = () => {
    if (event?.target != table.value) {
        console.log('Клик аут');
        
        isTableFocus.value = false
        window.removeEventListener('click', checkTableFocus)
    }
}

const table = ref<HTMLElement | null>(null)

const tableCeils = ref<string[][]>([])

tableCeils.value.push(tableBox.columns)

tableBox.rows.forEach(row => {
    tableCeils.value.push(row)
});

console.log('итог. таблица', tableCeils.value);

function saveCeil(row: number, ceil : number, text : string) {
    tableCeils.value[row][ceil] = text
    console.log(text);
    
}


</script>

<style scoped>
.preview *{
    border: none !important;
}
/*  */
.table{
    color: white;
    border: 1px solid white;
    font-size: 20px;
}
.table *{
    padding: 0;
}
.thead, .tbody{
    display: flex;
    flex-direction: column;
}
.thead-row, .tbody-row{
    display: flex;
}
.thead-ceil, .tbody-ceil{
    min-width: unset;
    width: 100%;
    min-height: 20px;
    display: flex;
    border: 1px solid ;
}

/* input{
    border: 1px solid;
} */
/*  */










.content-box{
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.table-box{
  outline: 2px solid transparent;
  transition: background-color 0.1s, outline-color 0.3s;
  caret-color: var(--color-accent);
}

.resizable.empty .table-box{
  background-color: #00000010;
}
/* .resizable.empty .table-box-content::before{
  content: 'Введите текст...';
  opacity: .5;
  cursor: text;
} */

.resizable:hover{
  z-index: 100;
}

.resizable:hover .table-box,
.table-box:focus-visible{
  background-color: #00000010;
  outline-color: var(--color-accent-light);
}

.table-box-content{
    cursor: text;
    caret-color: var(--color-accent); 
}
.table-box-content::selection {
  background-color: var(--color-accent-op);
  color: #fff;
}

</style>