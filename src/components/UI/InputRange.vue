<script setup lang="ts">

interface Props {
    min: number,
    max: number,
    modelValue: number,
    title ?: string
}
defineOptions({
    name: 'ui-input-range',
    inheritAttrs: false,
})
defineProps<Props>()

const newInputValue = (inputEvent: any) => +inputEvent.target.value;

const emit = defineEmits<{
    (e: 'update:modelValue', newValue: number): void
}>()

</script>

<template>
    <div class="input-block input-range">
        <div class="range-container">
            <input 
                class="theme-gradient"
                type="range" 
                :min="min" 
                :max="max" 
                :value="modelValue"
                @input="emit('update:modelValue', newInputValue($event))"
            >
        </div>
        <span class="modelValue-title">
            {{ modelValue }} {{ title }}
        </span>
    </div>
</template>

<style>
.input-range{
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    gap: 20px;
}

.range-container,
.range-container input
{
    width: 100%;
}

input[type='range'] {
    -webkit-appearance: none !important;
    appearance: none !important;
    /* background: var(--color-accent); */
    height: 6px;
    border-radius: 2px;
    /* box-shadow: inset 0 0 2px 0 var(--color-background); */
    filter: none !important;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none !important;
    background: var(--color-background-mute);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #FFF;
    /* border: 1px solid var(--color-background); */
    /* box-shadow: inset 0 0 8px 4px var(--color-accent); */
    cursor: grab;
}
input[type='range']::-webkit-slider-thumb:active{
    cursor: grabbing;
}

.modelValue-title{
    font-size: 22px;
    font-weight: 700;
    min-width: fit-content;
}
</style>