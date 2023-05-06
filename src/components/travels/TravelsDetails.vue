<template>
  <div class="travels-details flex w-full justify-center">
    <div v-if="props.travel" class="flex flex-col items-center">
      <span>{{ getCitiesFromTravel(props.travel) }}</span>
      <span>{{ getTravelPeriod(props.travel) }}</span>
      <div class="balance mb-4 grid grid-rows-2 items-center font-bold">
        <span class="flex justify-center">Total gasto:</span>
        <div class="flex items-center gap-4">
          <div
            v-for="(value, key) in selectedTravelExpensesSum"
            :key="key"
            class="balance-value"
          >
            {{ formatCurrency(value, key) }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <span>Selecione uma viagem</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { selectedTravelExpensesSum } from '../../services';
import { formatCurrency } from '../../utils';
import { getCitiesFromTravel, getTravelPeriod } from '../../utils/string-utils';
import { Travel } from './Travel';

const props = defineProps({
  travel: { type: Object as PropType<Travel | null>, default: null },
});
</script>
