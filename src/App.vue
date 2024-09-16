<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import HeaderLanding from '@/components/home/HeaderLanding.vue';
import FooterLanding from '@/components/home/FooterLanding.vue';

import AppNotification from '@/components/AppNotification.vue';
import AppDialog from '@/components/AppDialog.vue';

const startPage = () => ['home', 'info', 'PrivacyPolicy', 'RefundPolicy', 'PersonalData', 'UserAgreement'].includes(useRoute().name as string)

</script>

<template>
  
  <div class="app-container">

    <RouterView />

    <template v-if="startPage()">
      <HeaderLanding />
      <FooterLanding />
    </template>

  </div>

  <AppNotification />
  <AppDialog />

</template>