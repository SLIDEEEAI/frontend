<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({
    name: 'ui-input-select',
    // inheritAttrs: false,
    // customOptions: {},
})

interface Props {
    options : string[],
    tabindex ?: number
}

const props = defineProps<Props>()

const selected = ref<string | null>(props.options.length > 0 ? props.options[0] : null)
const open = ref<boolean>(false)

const emits = defineEmits<{
    (event : 'input', value : string | null) : void
}>()

onMounted(()=>{
    emits('input', selected.value)
})

</script>

<template>
    <div class="custom-select" 
        :tabindex="tabindex ? tabindex : 0" 
        @blur="open = false"
    >
        <div class="selected" 
            :class="{ open: open }" 
            @click="open = !open"
        >
            {{ selected }}
        </div>
        <div class="items" 
            :class="{ selectHide: !open }"
        >
            <div class="item" 
                v-for="(option, i) of options" 
                :key="i"
                @click="selected = option; open = false; $emit('input', option)"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<style scoped>

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 52px;
  line-height: 52px;
}

.selected {
  background-color: var(--color-background);
  border-radius: var(--radius-xsm);
  border: 1px solid transparent;
  color: var(--color-text-grey);
  padding-left: 16px;
  cursor: pointer;
  user-select: none;
  height: 100%;
}

.selected.open{
  border-color: var(--color-accent);
  border-radius: var(--radius-xsm) var(--radius-xsm) 0px 0px;
}

.selected:after {
    position: absolute;
    content: "";
    top: 24px;
    right: 16px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-color: #fff transparent transparent transparent;
}
.selected.open::after{
    border-color: var(--color-accent-light) transparent transparent transparent;
}

.items {
    max-height: 158px;
    overflow-y: scroll;
    color: #ffffff;
    border-radius: 0px 0px var(--radius-xsm) var(--radius-xsm);
    border-right: 1px solid var(--color-accent);
    border-left: 1px solid var(--color-accent);
    border-bottom: 1px solid var(--color-accent);
    background-color: var(--color-background);;
    position: absolute;
    left: 0;
    right: 0;
}

.item{
  color: var(--color-text-grey);
  padding-left: 16px;
  cursor: pointer;
  user-select: none;
}

.item:hover{
    color: var(--color-text);
    background-color: var(--color-accent-light);
}

.selectHide {
  display: none;
}
</style>