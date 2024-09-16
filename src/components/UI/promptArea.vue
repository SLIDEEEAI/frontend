<template>
    <div class="prompt-area" :class="{'shown' : shown}">
        <div class="prompt-area-btns">
            <IconGapDown class="area-btn hide-btn" @click="emit('hide')" title="Скрыть поле"/>
            <IconClose class="area-btn clear-field-btn" @click="emit('update:modelValue', '')" title="Очистить поле"/>
            <AiGenBtn class="area-btn action-btn" @click="emit('action')" title="Отправить запрос"/>
        </div>
        <textarea 
            class="prompt-value" 
            :value="modelValue"
            @input="emit('update:modelValue', newInputValue($event))"
            placeholder="Введите запрос"
        ></textarea>
    </div>
</template>

<script lang="ts" setup>

    import AiGenBtn from '@/components/icons/textEditIcons/AiText.vue';
    import IconClose from '@/components/icons/IconClose.vue';
    import IconGapDown from '@/components/icons/IconGapDown.vue';

    defineProps<{
        modelValue : string,
        shown : boolean
    }>()

    const newInputValue = (inputEvent:any) => inputEvent.target.value;

    const emit = defineEmits<{
        (e: 'update:modelValue', newValue : string) : void
        (e: 'action') : void
        (e: 'hide') : void
    }>()

</script>

<style scoped>

.prompt-area{
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 0px;
    padding: 2px;
    opacity: 0;
    overflow: hidden;
    transition: height 0.2s ease-out,
                opacity 0.15s linear;
}
.prompt-area.shown{
    opacity: 1;
    height: 200px;
}
.prompt-area-btns{
    display: flex;
    gap: 4px;
    min-width: fit-content;
}
.prompt-area textarea{
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 8px;
    background: var(--color-background);
    color: var(--color-text);
    border-radius: var(--radius-xsm);
    border: none;
    outline: 1px solid transparent;
    resize: none;
}
.prompt-area textarea:focus-visible{
    border: none;
    outline-color: var(--color-accent);
}

.area-btn{
    width: 24px;
    height: 24px;
}
.area-btn:hover{
    cursor: pointer;
    background: var(--color-background-mute);
}

.action-btn{
    margin-left: auto;
}
.hide-btn{
    rotate: 180deg;
}
</style>