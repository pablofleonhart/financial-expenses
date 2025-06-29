<template>
  <span
    v-if="message"
    class="bg-red-200 text-red-600 rounded-xl pl-2 text-sm"
    >{{ message }}</span
  >
</template>

<script lang="ts" setup>
defineProps({
  message: { type: String, default: '' },
});
</script>
