<template>
    <div class="message-block">
        <legend class="message" :class="{'system-mess theme-gradient' : from == 'system', 'user-mess' : from == 'user'}">
            <slot name="text"></slot>
            <icon-edit 
                v-if="editable && from == 'user'" 
                class="editIcon" 
                @click="$emit('edit')"
            />
        </legend>

        <div class="attachments" v-if="from == 'system'">
            <slot name="attachments"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        from : 'system' | 'user'
        editable ?: boolean 
    }>()
    defineEmits<{
        (event : 'edit') : void
    }>()
</script>

<style scoped>
@keyframes appear {
    100% {
        opacity: 1;
    }
}
legend {
    position: relative;
    margin-bottom: 20px;
}
legend.message {
    position: relative;
    font-size: 18px;
    font-weight: 600;
    min-width: 412px;
    width: fit-content;
    padding: 15px 18px;
    border-radius: var(--radius-common);
    opacity: 0;
    animation: appear 0.3s ease 0.1s forwards;
}

legend.message.system-mess::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    display: block;
    background-image: url(../../assets/icons/chat-item-pattern.svg);
    width: 29px;
    height: 22px;
}
legend.message.user-mess {
    position: relative;
    background: var(--color-background-mute);
    width: fit-content;
    min-width: unset;
    margin-left: auto;
}
legend.message.user-mess::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: -6px;
    display: block;
    background-image: url(../../assets/icons/chat-item-user-pattern.svg);
    width: 29px;
    height: 22px;
}
.editIcon{
    position: absolute;
    left: -28px;
    bottom: 0;
    top: 0;
    opacity: 0;
    margin: auto 0;
    cursor: pointer;
}
legend:hover .editIcon{
    opacity: 1;
}
</style>