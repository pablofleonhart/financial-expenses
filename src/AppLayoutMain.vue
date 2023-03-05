<template>
  <div
    class="grid grid-cols-[min-content_1fr] grid-rows-[60px_1fr] font-sans bg-neutral-color-300 text-neutral-color"
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
