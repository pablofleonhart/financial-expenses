<template>
  <div
    v-show="showProfileMenu"
    class="flex flex-col absolute items-center justify-self-end top-16 mr-2 w-40 bg-primary-color-300 border border-primary-color-700"
    @click.stop
  >
    <button
      class="logout-button flex w-full p-2 h-10 mb-2 hover:bg-primary-color-700"
      @click="logout"
    >
      <ph-power class="h-6 w-6 mr-2" />
      <span>Logout</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { logout } from '../../services';

defineProps({
  showProfileMenu: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped></style>
