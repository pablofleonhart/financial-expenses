<template>
  <div class="travels-details flex w-full justify-center">
    <div v-if="props.travel" class="flex flex-col items-center">
      <span>{{ getCitiesFromTravel(props.travel) }}</span>
      <span>{{ getTravelPeriod(props.travel) }}</span>
    </div>
    <div v-else>
      <span>Selecione uma viagem</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { getCitiesFromTravel, getTravelPeriod } from '../../utils/string-utils';
import { Travel } from './Travel';

const props = defineProps({
  travel: { type: Object as PropType<Travel | null>, default: null },
});
</script>
