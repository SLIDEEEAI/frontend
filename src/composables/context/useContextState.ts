import { ref, type CSSProperties } from 'vue'

export function useContextState(xLine ?: number, yLine ?: number, position : 'static' | 'absolute' | 'fixed' = 'fixed') {

    const left = ref<number>(0)
    const top = ref<number>(0)
    const right = ref<number>(0)
    const bottom = ref<number>(0)

    const xSide = ref<'l'|'r'>('l')
    const ySide = ref<'t'|'b'>('t')

    const show = ref<boolean>(false)

    const positionCSS = () : CSSProperties => {

        if (position == 'static'){
            return {
                position : position
            }
        }
        else if (position == 'absolute'){

            // const translateX = xSide.value == 'r' ? "calc(-100% - 8px)" : "8px"
            // const translateY = ySide.value == 'b' ? "calc(-100% - 8px)" : "8px"
    
            return {
                left : left.value != 0 ? left.value + 'px' : 'unset',
                top : top.value != 0 ? top.value + 'px'  : 'unset',
                right : right.value != 0 ? right.value + 'px'  : 'unset',
                bottom : bottom.value != 0 ? bottom.value + 'px'  : 'unset',
                position : position ,
                // translate : translateX + " " + translateY
            }
        }
        else{
            // const translateX = xSide.value == 'r' ? "calc(-100% - 8px)" : "8px"
            // const translateY = ySide.value == 'b' ? "calc(-100% - 8px)" : "8px"
            return {
                left : left.value != 0 ? left.value + 'px' : 'unset',
                top : top.value != 0 ? top.value + 'px'  : 'unset',
                right : right.value != 0 ? right.value + 'px'  : 'unset',
                bottom : bottom.value != 0 ? bottom.value + 'px'  : 'unset',
                position : position ,
                // translate : translateX + " " + translateY
            }
        }

    }
    

    function open(event:MouseEvent) {
        
        const _xLine = xLine ? window.innerWidth - xLine : window.innerWidth / 2
        const _yLine = yLine ? window.innerHeight - yLine : window.innerHeight / 2
            
        xSide.value = event.clientX > _xLine ? 'r' : 'l'
        ySide.value = event.clientY > _yLine ? 'b' : 't'
        // дописать right и bottom
        // rect.
        
        if (position == 'absolute') {
            const parent : any = event.target
            const rect : DOMRect = parent.getBoundingClientRect()

            left.value = xSide.value == "l" ? event.clientX - rect.x : 0
            top.value = ySide.value == "t" ? event.clientY - rect.y : 0
            right.value = xSide.value == "r" ? rect.x + rect.width - event.clientX : 0
            bottom.value = ySide.value == "b" ? rect.y + rect.height- event.clientY : 0
        }
        else if (position == 'fixed'){
            left.value = xSide.value == "l" ? event.clientX : 0
            top.value = ySide.value == "t" ? event.clientY : 0
            right.value = xSide.value == "r" ? window.innerWidth - event.clientX : 0
            bottom.value = ySide.value == "b" ? window.innerHeight - event.clientY : 0
        }

        // console.log("Left? : " + left.value + " ; Top? : " + top.value + ".")

        show.value = true

        // console.log(positionCSS())
        // console.log(xLine, window.innerWidth, _xLine, xSide.value)
        // console.log(xLine, window.innerHeight, _yLine, ySide.value)

        window.addEventListener('click', hide)
        window.addEventListener('contextmenu', hide, { capture : true }) // без capture контекст вызывается сразу после открытия
        // console.log('добавил события')
        // console.log('отработал open')
    }

    function hide() {
        if (show.value) {
            show.value = false
            // console.log('скрыл');
            window.removeEventListener('click', hide)
            window.removeEventListener('contextmenu', hide, { capture : true })
            // console.log('удалил события');  
        }
        // console.log('отработал hide');
    }
    return {
        show,
        open,
        hide,
        positionCSS
    }
}