<template>
  <div class="travels-header flex h-32 w-full justify-center">
    <div
      v-for="(travel, index) in allTravelItems"
      :key="index"
      class="flex cursor-pointer m-4 h-24 w-fit justify-center rounded-xl bg-neutral-color-700 hover:bg-secondary-color-300"
      :class="{ 'bg-secondary-color-300': travel.id === selectedTravel?.id }"
    >
      <div
        class="flex flex-col items-center justify-center h-full gap-2 p-2"
        @click="onSelectTravel(travel)"
      >
        <div class="flex gap-4">
          <country-flag
            v-for="(country, index) in travel.country"
            :key="index"
            :country="country"
            size="big"
            :rounded="true"
            :shadow="true"
          />
        </div>
        <span>{{ getCitiesFromTravel(travel) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import CountryFlag from 'vue-country-flag-next';
import { Travel } from './Travel';
import { allTravelItems, loadTravels } from '../../services';
import { getCitiesFromTravel } from '../../utils/string-utils';

const emit = defineEmits(['select-travel']);
const selectedTravel = ref<Travel | null>(null);

onMounted(() => {
  loadTravels();
});

const onSelectTravel = (travel: Travel) => {
  emit('select-travel', travel);
  selectedTravel.value = travel;
};
</script>
