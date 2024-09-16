<script setup lang="ts">

import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

const notificationStore = useNotificationStore();

const { noticeState } = storeToRefs(notificationStore)
const { hideNotification } = notificationStore;

const noticeMess = ref<HTMLElement>()

onMounted( () => {
  watch(noticeState.value, () => {
    // console.log('Текст нотис изменён на: ' + noticeState.value.text);
    if (noticeMess.value) {
      noticeMess.value.innerHTML = noticeState.value.text
    }
  })
})

</script>

<template>
  <div class="notification-container" 
    :class="{ show: noticeState.isVisible,
              success: noticeState.type == 'success',
              warning: noticeState.type == 'warning',
              error: noticeState.type == 'error',
              information: noticeState.type == 'information'}"
  >
    <div class="overlayer"></div>
    <span class="notice-message" ref="noticeMess"></span>
    <button @click="hideNotification">
      <icon-close :type="noticeState.type"/>
    </button>
  </div>
</template>

<style scoped>
.notification-container {
  filter: drop-shadow(0 4px 6px #00000060);
  min-width: 440px;
  max-width: 440px;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 60px 12px 24px;
  border: 1px solid;
  border-radius: var(--radius-xsm);
  background-color: transparent;
  position: fixed;
  bottom: 20px;
  right: 0px;
  opacity: 0;
  overflow: hidden;
  transition: 
    transform 0.4s ease-in-out,
    opacity 0.3s 0.1s ease-out;
  z-index: 9999;
}
.notice-message{
  display: inline-block;
  text-wrap: balance;
}
button{
  background-color: transparent;
  height: fit-content;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  margin-right: 16px;
  z-index: 1;
  cursor: pointer;
}
button:hover{
  color: var(--c-accent);
  opacity: 1;
}
.notification-container.show {
  transform: translateX(-30px);
  opacity: 1;
}
  

.notification-container.information{
    color: var(--color-information);
    border-color: var(--color-information);
}
.notification-container.success{
    color: var(--color-success);
    border-color: var(--color-success);
}
.notification-container.warning{
    color: var(--color-warning);
    border-color: var(--color-warning);
}
.notification-container.error{
    color: var(--color-error);
    border-color: var(--color-error);
}

.overlayer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .25;
  z-index: -1;
}
.notification-container.information .overlayer{
  background-color: var(--color-information);
}
.notification-container.success .overlayer{
    background-color: var(--color-success);
}
.notification-container.warning .overlayer{
    background-color: var(--color-warning);
}
.notification-container.error .overlayer{
    background-color: var(--color-error);
}

</style>
