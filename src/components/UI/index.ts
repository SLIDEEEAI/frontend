import ButtonUI from './ButtonUI.vue';
import InputText from './InputText.vue';
import InputRange from './InputRange.vue';
import InputSelect from './InputSelect.vue';
import TooltipUI from "./TooltipUI.vue";
import AccordionUI from "./AccordionUI.vue";

function getComponentName(component : any) : string {
    return component.name || component.__name
}

const components = {
    [getComponentName(ButtonUI)] : ButtonUI,
    [getComponentName(InputText)]  : InputText,
    [getComponentName(InputRange)]  : InputRange,
    [getComponentName(InputSelect)]  : InputSelect,
    [getComponentName(TooltipUI)]  : TooltipUI,
    [getComponentName(AccordionUI)]  : AccordionUI
}
// console.log(components);

// export default [
//     ButtonUI,
//     InputText,
//     InputRange,
//     InputSelect
// ]
export default components
