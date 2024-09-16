// types/vue-resizable.d.ts
declare module 'vue-resizable' {
  import { DefineComponent } from 'vue';

  // Определите свойства (props), события, слоты и т.д., если они есть
  interface VueResizableProps {
    dragSelector ?: string,
    active ?: string[],
    fitParent ?: boolean,
    maxWidth ?: number,
    maxHeight ?: number,
    minWidth ?: number,
    minHeight ?: number,
    width ?: number | string | undefined,
    height ?: number | string | undefined,
    left ?: string | number | undefined,
    top ?: string | number | undefined
  }

  // Этот интерфейс можно расширить, добавив методы, события и т.д.
  interface VueResizableComponent extends DefineComponent<VueResizableProps> {}

  const VueResizable: VueResizableComponent;

  export default VueResizable;
}