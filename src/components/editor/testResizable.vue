<script lang="ts" setup>

import { ref } from 'vue';
import VueResizable from 'vue-resizable'

const tW = 100
const tH = 150

const handlers = ref<string[]>(["r", "rb", "b", "lb", "l", "lt", "t", "rt"])
const left = ref<string>(`calc( 50% - ${tW / 2}px)`)
const top = ref<string>(`calc(50% - ${tH / 2}px)`)
const height = ref<number>(tH)
const width = ref<number>(tW)
// const maxW = ref<number>(500)
const maxH = ref<number>(250)
const minW = ref<number>(100)
const minH = ref<number>(100)
const fit = ref<boolean>(true)
const event = ref<string>("")
const dragSelector = ref<string>(".drag-container")

interface eHandker {
    width : number,
    height : number,
    left : string,
    top : string,
    eventName : string
}

function eHandler(data : eHandker) {
    width.value= data.width
    height.value = data.height
    left.value = data.left
    top.value = data.top
    event.value = data.eventName
}



</script>

<template>
    <!-- <div>
      <div class="container"> -->
        <vue-resizable
          class="resizable"
          ref="resizableComponent"
          :dragSelector="dragSelector"
          :active="handlers"
          :fit-parent="fit"
          :left="10"
          :top="10"
          :width="width"
          :height="height"
          @mount="eHandler"
          @resize:move="eHandler"
          @resize:start="eHandler"
          @resize:end="eHandler"
          @drag:move="eHandler"
          @drag:start="eHandler"
          @drag:end="eHandler"
        >
          <div class="block">
            <div class="drag-container">
                <div class="table-container">
                    <table>
                        <tr>
                            <td>w:{{width}}</td>
                            <td>h:{{height}}</td>
                        </tr>
                        <tr>
                            <td>l:{{left}}</td>
                            <td>t:{{top}}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- <div class="drag-container-1">drag_1</div> -->
            <!-- <div class="drag-container-2">drag_2</div> -->
          </div>
        </vue-resizable>
      <!-- </div>
      <div class="container table-block">
        <div class="table-row">
          <div>
            <h4>handlers:</h4>
          </div>
          <span v-for="handler in ['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt']" :key="handler">
            {{handler}}:
            <input type="checkbox" v-model="handlers" :value="handler">
          </span>
        </div>
        <div class="table-row">
          <div class="table-cell">minWidth:
            <input class="table-input" type="number" v-model.number="minW">
          </div>
          <div class="table-cell">maxWidth:
            <input class="table-input" type="number" v-model.number="maxW">
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell">minHeight:
            <input class="table-input" type="number" v-model.number="minH">
          </div>
          <div class="table-cell">maxHeight:
            <input class="table-input" type="number" v-model.number="maxH">
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell">width:
            <input class="table-input" type="number" v-model.number="width">
          </div>
          <div class="table-cell">height:
            <input class="table-input" type="number" v-model.number="height">
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell">left:
            <input class="table-input" type="number" v-model.number="left">
          </div>
          <div class="table-cell">top:
            <input class="table-input" type="number" v-model.number="top">
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell">fitParent:
            <input type="checkbox" v-model.number="fit">
          </div>
        </div>
        <div class="table-row" style="text-align: left;">
          <div class="table-cell" style="padding: 0 20px;width: 100%">lastEvent: {{event}}</div>
        </div>
      </div>
    </div> -->
  </template>



<style scoped >
.resizable-component{
    z-index: 1;
}

.block {
  height: 100%;
  width: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 300px;
  height: 300px;
  display: inline-block;
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #333333;
  float: left;
  margin: 10px;
}

#block1 {
  border: solid black 1px;
  height: 300px;
  width: 300px;
  display: inline-block;
  float: left;
}

.resizable {
  background-position: top left;
  width: 150px;
  height: 150px;
  padding: 0;
  border: 1px solid #003eff;
  background: #007fff;
  font-weight: normal;
  color: #ffffff;
  position: relative;
}

.table-block {
  display: table;
}

.table-row {
  display: table-row;
  text-align: center;
}

.table-cell {
  width: 50%;
  display: inline-block;
}

.table-input {
  width: 50px;
}

.drag-container{
    width: 100%;
    height: 100%;
    padding: 10px;
    cursor: grab;
    background-color: #003eff;
}
.drag-container:active{
    cursor: grabbing;
}
/* .drag-container-1,
.drag-container-2 {
  width: 100%;
  height: 20px;
  background: red;
  color: white;
  text-align: center;
  cursor: pointer;
} */

.table-container {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aqua;
}
</style>
