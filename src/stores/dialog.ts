import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {

    const isDialog = ref<boolean>(false)

    const hideDialog = () => {
        isDialog.value = false
        document.body.removeAttribute('style')
    }

    const openDialog = () => {
        document.body.style.overflow = 'hidden'
        isDialog.value = true
        window.addEventListener('keydown', handleKeyDown)
    }

    function handleKeyDown(event : KeyboardEvent) {
        if (event.key === 'Escape') {
            hideDialog()
            window.removeEventListener('keydown', handleKeyDown)
        }
    }

    return {
        isDialog,
        openDialog,
        hideDialog
    }
})
