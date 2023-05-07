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
  <travel-item-modal
    :opened="showTravelItemModal"
    :expense="objTravel"
    @close="showTravelItemModal = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Travel } from './Travel';
import TravelsHeader from './TravelsHeader.vue';
import TravelItemModal from './TravelItemModal.vue';
import TravelsDetails from './TravelsDetails.vue';
import ExpensesList from '../expenses/ExpensesList.vue';
import {
  filterExpenses,
  loadExpenses,
  showFixedExpense,
  showVariablesExpense,
  travelExpense,
} from '../../services';
import { Expense } from '../expenses/Expense';
import { copyExpense } from '../../utils';

const showTravelItemModal = ref(false);
const objTravel = ref(new Expense());
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

const onEditExpense = (travel: Expense) => {
  // emit('onEditExpense', index);
  objTravel.value = copyExpense(travel);
  // console.log(index)
  showTravelItemModal.value = true;
};

const onDeleteExpense = (travel: Expense) => {
  // emit('onDeleteExpense', index);
};
</script>
