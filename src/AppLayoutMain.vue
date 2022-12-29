<template>
  <div class="grid grid-cols-[156px_1fr] font-sans bg-secondary-color">
    <app-sidebar />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import AppSidebar from './AppSidebar.vue';
</script>

<style lang="scss" scoped></style>
