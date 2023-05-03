<template>
  <div class="flex flex-col">
    <travels-header @select-travel="onSelectTravel" />
    <travels-details :travel="selectedTravel" />
    <expenses-list
      v-if="selectedTravel"
      class="flex my-4"
      @on-edit-expense="onEditExpense"
      @on-delete-expense="onDeleteExpense"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Travel } from './Travel';
import TravelsHeader from './TravelsHeader.vue';
import TravelsDetails from './TravelsDetails.vue';
import ExpensesList from '../expenses/ExpensesList.vue';
import {
  filterExpenses,
  loadExpenses,
  showFixedExpense,
  showVariablesExpense,
  travelExpense,
} from '../../services';

const selectedTravel = ref<Travel | null>(null);

const $route = useRoute();

const applyFilterExpenses = () => {
  showFixedExpense.value = false;
  showVariablesExpense.value = false;
  travelExpense.value = selectedTravel.value;
  filterExpenses(null);
};

onMounted(async () => {
  await loadExpenses();
  applyFilterExpenses();
});

watch($route, () => {
  applyFilterExpenses();
});

const onSelectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
  applyFilterExpenses();
};

const onEditExpense = (index: number) => {
  // emit('onEditExpense', index);
};

const onDeleteExpense = (index: number) => {
  // emit('onDeleteExpense', index);
};
</script>
