<template>
  <div class="flex flex-col">
    <travels-header @select-travel="onSelectTravel" />
    <travels-details :travel="selectedTravel" />
  </div>
</template>

<script lang="ts" setup>
import { Travel } from './Travel';
import TravelsHeader from './TravelsHeader.vue';
import TravelsDetails from './TravelsDetails.vue';
import { ref } from 'vue';

const selectedTravel = ref<Travel | null>(null);

const onSelectTravel = (travel: Travel) => {
  console.log(travel);
  selectedTravel.value = travel;
};
</script>
