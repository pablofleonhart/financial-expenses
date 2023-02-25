<template>
  <div
    v-show="showProfileMenu"
    class="flex flex-col absolute items-center justify-self-end top-16 mr-2 w-40 bg-primary-color border border-primary-color-dark"
    @click.stop
  >
    <button
      class="sync-button flex w-full p-2 h-10 m-2 hover:bg-primary-color-dark hover:text-white"
      @click="syncAllData"
    >
      <ph-cloud-arrow-down class="h-6 w-6 mr-2" />
      <span>Sincronizar</span>
    </button>
    <button
      class="logout-button flex w-full p-2 h-10 mb-2 hover:bg-primary-color-dark hover:text-white"
      @click="logout"
    >
      <ph-power class="h-6 w-6 mr-2" />
      <span>Logout</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { logout, syncAllData } from '../../services';

defineProps({
  showProfileMenu: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped></style>
