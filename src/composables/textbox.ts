import { ref } from 'vue'

import { usePresentationStore } from "@/stores/presentation";
import { type TextBox } from "@/types/Presentation";
export function useContext(textbox : TextBox) {

    const tb = ref(textbox)

    function setNewStyle(bold:boolean, index: number) {
        
        

        return tb
    }

    return {
        setNewStyle
    }
}