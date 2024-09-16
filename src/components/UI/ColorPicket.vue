<template>
    <div class="color-picker">
      <div class="color-box" :style="{ backgroundColor: selectedColor }"></div>
      <input type="text" v-model="selectedColor" @click="openColorPicker" readonly />
      <div v-if="isColorPickerOpen" class="color-picker-overlay">
        <div class="color-picker-container">
          <input type="color" v-model="selectedColor" @input="updateColor" />
          <button @click="closeColorPicker">Закрыть</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
    setup() {
      const selectedColor = ref('#000000');
      const isColorPickerOpen = ref(false);
  
      const openColorPicker = () => {
        isColorPickerOpen.value = true;
      };
  
      const closeColorPicker = () => {
        isColorPickerOpen.value = false;
      };
  
      const updateColor = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        selectedColor.value = inputElement.value;
      };
  
      return {
        selectedColor,
        isColorPickerOpen,
        openColorPicker,
        closeColorPicker,
        updateColor,
      };
    },
  };
  </script>
  
  <style scoped>
  .color-picker {
    position: relative;
    display: inline-block;
  }
  
  .color-box {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  .color-picker-overlay {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  .color-picker-container {
    display: flex;
    align-items: center;
  }
  
  .color-picker-container input[type="color"] {
    margin-right: 10px;
  }
  </style>
  