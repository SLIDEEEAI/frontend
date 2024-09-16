// import { App } from 'vue';
import ButtonUI from '@/components/UI/ButtonUI.vue';
import InputRange from '@/components/UI/InputRange.vue';
import InputText from '@/components/UI/InputText.vue';
import InputSelect from '@/components/UI/InputSelect.vue';
import TooltipUI from "@/components/UI/TooltipUI.vue";
import AccordionUI from "@/components/UI/AccordionUI.vue";

// import components from '@/components/UI';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        'ui-button': typeof ButtonUI,
        'ui-input-range': typeof InputRange,
        'ui-input-text': typeof InputText,
        'ui-input-select': typeof InputSelect,
        'ui-tooltip': typeof TooltipUI,
        'ui-accordion': typeof AccordionUI,
    }
}

// Попытка импортировать все компоненты

// import components from '@/components/UI';

// declare module '@vue/runtime-core' {
//     export interface GlobalComponents {
//         [key in typeof components]: ReturnType<typeof components[key]>;
//     }
// }

// Попытка импортировать все компоненты с кастом именами

// import components from '@/components/UI';
// type ComponentNames = keyof typeof components;

// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     [key in ComponentNames]: ReturnType<typeof components[key]>;
//   }
// }

