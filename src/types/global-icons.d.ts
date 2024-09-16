import IconProjects from '@/components/icons/IconProjects.vue';
import IconPatterns from '@/components/icons/IconPatterns.vue';
import IconShared from '@/components/icons/IconShared.vue';
import IconFire from '@/components/icons/IconFire.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconNoProjects from '@/components/icons/IconNoProjects.vue';
import IconExit from '@/components/icons/IconExit.vue';
import IconExplain from '@/components/icons/IconExplain.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconWarning from '@/components/icons/IconWarning.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDragRow from '@/components/icons/IconDragRow.vue';
import IconUserOptions from '@/components/icons/IconUserOptions.vue';
import IconNotice from '@/components/icons/IconNotice.vue';
import IconChat from '@/components/icons/IconChat.vue';
import IconDownload from '@/components/icons/IconDownload';
import IconMagic from '@/components/icons/IconMagic.vue';

import IconGapDone from '@/components/icons/IconGapDone.vue';


declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        'icon-projects' : typeof IconProjects,
        'icon-patterns' : typeof IconPatterns,
        'icon-shared' : typeof IconShared,
        'icon-fire' : typeof IconFire,
        'icon-settings' : typeof IconSettings,
        'icon-no-projects' : typeof IconNoProjects,
        'icon-exit' : typeof IconExit,
        'icon-explain' : typeof IconExplain,
        'icon-copy' : typeof IconCopy,
        'icon-close' : typeof IconClose,
        'icon-warning' : typeof IconWarning,
        'icon-edit' : typeof IconEdit,
        'icon-drag-row' : typeof IconDragRow,
        'icon-user-options' : typeof IconUserOptions,
        'icon-notice' : typeof IconNotice,
        'icon-chat' : typeof IconChat,
        'icon-download' : typeof IconDownload,
        'icon-magic' : typeof IconMagic,
        'icon-gap-done' : typeof IconGapDone,
        
    }
}