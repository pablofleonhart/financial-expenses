<template>
  <div
    class="grid grid-cols-[156px_1fr] grid-rows-[60px_1fr] font-sans bg-secondary-color"
  >
    <app-sidebar class="row-span-2" />
    <app-header />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
</script>

<style lang="scss" scoped></style>
