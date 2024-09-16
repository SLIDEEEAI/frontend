<template>
    <div class="input-block" :style="containerStyle">
        <label v-if="label" for="user-mail">{{ label }}</label>
        <input 
            :placeholder="placeholder ? placeholder : 'text'" 
            :type="inputType" 
            v-bind="$attrs"
            :value="modelValue"
            @input="emit('update:modelValue', newInputValue($event))"
        >
        <img
            v-if="type == 'password'"
            class="passwordToggleBtn"
            :class="{ 'show-pass' : inputType == 'text' }"
            src="@/assets/icons/eye_closed.svg"
            aria-label="Показать пароль" 
            @click="togglePassword"
        >
        <div class="error-message" v-if="errorMessage?.length">
            <icon-warning />
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from 'vue';

    defineOptions({
        name: 'ui-input-text',
        inheritAttrs: false,
    })

    interface Props {
        modelValue : string
        type : 'text' | 'email' | 'password',
        label ?: string,
        placeholder ?: string,
        classes ?: string,
        containerStyle ?: CSSProperties,
        errorMessage ?: string
    }

    const props = defineProps<Props>()

    const inputType = ref<string>(props.type);

    function togglePassword(){
        switch (inputType.value) {
            case 'password':
                inputType.value = 'text'
                break;
            case 'text':
                inputType.value = 'password'
                break;
        }
    }
    
    const newInputValue = (inputEvent:any) => inputEvent.target.value;

    const emit = defineEmits<{
        (e: 'update:modelValue', newValue : string) : void
    }>()

</script>

<style>
input{
    caret-color: var(--color-accent);
}
.passwordToggleBtn{
    width: 35px;
    height: 24px;
    position: absolute;
    right: 24px;
    bottom: 14px;
    cursor: pointer;
    transition: none;
}
.passwordToggleBtn.show-pass{
    rotate: 180deg;
    translate: 0 -4px;
}
.error-message{
    position: absolute;
    bottom: 0;
    translate: 0 calc(100% + 4px);
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: var(--color-error);
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
