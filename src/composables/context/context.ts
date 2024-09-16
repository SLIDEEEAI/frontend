import { onMounted } from 'vue'

export interface contextXY{
    x : number
    y : number
}

export function useContext() {

    console.log('инициализирую контекстное меню');

    const emit = defineEmits<{
        (event:'hide') : void
    }>()

    const hideContext = () => emit('hide')

    onMounted(() => {
        console.log('стейт для контекста применён');

        window.addEventListener('click', hideContext)
    })

    return {  
        emit,
        hideContext
    }

}