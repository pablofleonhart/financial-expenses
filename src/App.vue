<template>
  <app-layout />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import AppLayout from './AppLayout.vue';

provide('size', 32);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
