import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export type NoticeType = "success" | "warning" | "error" | "information" 

interface State {
    text : string
    type : NoticeType
    isVisible : boolean
}

export const useNotificationStore = defineStore('notification', () => {

    const noticeState = reactive<State>({
        text : 'Текст оповещения',
        type : "information",
        isVisible : false
    })

    // const noticeText = ref<string>('Текст оповещения')
    // const isVisible = ref<boolean>(false)

    const open = () => {
        noticeState.isVisible = true 
    }
    const close = () => {
        noticeState.isVisible = false
    }
    // Создаём ссылку на компонент Notification, для использования его функций
    // Передаём ссылку в теге компонента в :ref
    function showNotification (text : string, type : NoticeType = 'information', keepNotice = false) {
        noticeState.type = type
        noticeState.text = text
        open()
        if (!keepNotice) {
            setTimeout(() => close(), 3000)
        }
    }

    function hideNotification() {
        close()
    }

    return {
        noticeState,

        showNotification,
        hideNotification
    }
})