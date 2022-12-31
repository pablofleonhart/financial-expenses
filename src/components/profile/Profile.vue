<template>
  <div
    v-show="showProfileMenu"
    class="flex absolute items-center justify-self-end top-16 mr-2 h-20 w-40 bg-primary-color border border-primary-color-dark"
    @click.stop
  >
    <button
      class="logout-button flex w-full p-2 h-10 hover:bg-primary-color-dark hover:text-white"
      @click="logout"
    >
      <logout-icon class="h-6 w-6 mr-2" />
      <span>Logout</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import LogoutIcon from '../../assets/LogoutIcon.vue';
import { logout } from '../../services';

defineProps({
  showProfileMenu: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
.logout-button {
  &:hover {
    :deep(.sign-out) {
      line,
      path,
      polyline {
        stroke: #fff;
      }
    }
  }
}
</style>
