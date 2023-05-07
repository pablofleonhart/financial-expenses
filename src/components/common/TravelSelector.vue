<template>
  <div
    class="travel-select rounded outline-0 focus:ring focus:ring-secondary-color-300"
    @click.stop
  >
    <div
      class="selected-option flex items-center outline-0 rounded p-2 bg-neutral-color-700 h-10 cursor-pointer"
      :class="{ open: travelSelectorOpen }"
      @click="travelSelectorOpen = !travelSelectorOpen"
    >
      <div class="flex relative top-[-4px]">
        <country-flag
          v-if="selectedTravel"
          :country="selectedTravel.country[0]"
          :rounded="true"
        />
      </div>
      <span class="selected-option-name ml-2">
        {{ getTravelName(selectedTravel) }}
      </span>
    </div>
    <ul
      class="period-items scrollbar overflow-y-auto overflow-x-hidden absolute bg-neutral-color-500 border-2 border-neutral-color-700 rounded h-auto max-h-80 w-80 z-10"
      :class="{ hidden: !travelSelectorOpen }"
    >
      <li
        class="item flex cursor-pointer p-2 h-10 w-full hover:bg-neutral-color-700 hover:text-secondary-color-300"
        :class="{
          'bg-neutral-color-700 text-secondary-color-300':
            travel.id === selectedTravel?.id,
        }"
        v-for="travel in travels"
        :key="travel.id"
        @click="selectTravel(travel)"
      >
        <div class="flex relative top-[-4px]">
          <country-flag :country="travel.country[0]" :rounded="true" />
        </div>
        <span class="item-name ml-2">
          {{ getTravelName(travel) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef, watch } from 'vue';
import { allTravelItems } from '../../services';
import { getCitiesFromTravel } from '../../utils/string-utils';
import CountryFlag from 'vue-country-flag-next';
import { Travel } from '../travels/Travel';

const props = defineProps({
  initialValue: { type: Travel, default: new Travel() },
  emptyMessage: { type: String, default: 'Selecione uma viagem' },
});

const emit = defineEmits(['select']);

const travels = computed<Array<Travel>>(() => allTravelItems);
const selectedTravel = shallowRef(props.initialValue);
const travelSelectorOpen = ref(false);

watch(
  () => props.initialValue,
  () => {
    selectedTravel.value = getTravelByID(props.initialValue.id);
  }
);

const getTravelByID = (id: string) => {
  return allTravelItems.filter((travel) => travel.id === id)[0];
};

const getTravelName = (travel: Travel): string => {
  if (!travel.id) {
    return props.emptyMessage;
  }

  const objTravel = getTravelByID(travel.id);
  return getCitiesFromTravel(objTravel);
};

const selectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
  travelSelectorOpen.value = false;
  emit('select', travel);
};

onMounted(() => {
  const mySelect = document.querySelector('.travel-select');

  if (mySelect) {
    mySelect.addEventListener('keydown', (event: any) => {
      if (event.keyCode === 32) {
        travelSelectorOpen.value = !travelSelectorOpen.value;
      }
    });
  }
});

window.addEventListener('click', () => (travelSelectorOpen.value = false));
</script>
