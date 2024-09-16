export default {
    name : 'select',
    mounted(el : HTMLElement) {
        // mounted(el, binding, node) {
          el.addEventListener('mouseup', () => {
            const selectedText = document.getSelection()
            if (selectedText) {
                const str = selectedText.toString()
                if (str.length > 0) {
                    console.log(str)
                }
            }
          })
        }
}