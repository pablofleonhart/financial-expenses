<template>
  <component :is="layout" />
</template>

<script lang="ts" setup>
import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppLayoutLogin from './AppLayoutLogin.vue';
import AppLayoutMain from './AppLayoutMain.vue';

const route = useRoute();
const layout: any = shallowRef(null);

watch(
  () => route.meta,
  () => {
    if (route.name === 'login') {
      layout.value = AppLayoutLogin;
    } else {
      layout.value = AppLayoutMain;
    }
  }
);
</script>
