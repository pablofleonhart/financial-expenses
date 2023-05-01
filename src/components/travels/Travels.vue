<template>
  <div v-for="(travel, index) in allTravelItems" :key="index">
    <span>{{ travel.place }}</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { allTravelItems, loadTravels } from '../../services';

onMounted(() => {
  loadTravels();
});
</script>
