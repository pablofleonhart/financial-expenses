<template>
  <div class="tabs flex gap-6 h-8 w-full border-b border-neutral-color">
    <button
      class="filter-tab"
      :class="{
        'filter-tab-selected': selectedTab === 'list',
      }"
      @click="onClickTab('list')"
    >
      Lista
    </button>
    <button
      class="filter-tab"
      :class="{
        'filter-tab-selected': selectedTab === 'chart',
      }"
      @click="onClickTab('chart')"
    >
      Gráficos
    </button>
  </div>
  <expenses-list
    v-if="selectedTab === 'list'"
    class="flex my-4"
    @on-edit-expense="onEditExpense"
    @on-delete-expense="onDeleteExpense"
  />
  <expenses-analyzes v-else :on-reload="reloadChart" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ExpensesList from './ExpensesList.vue';
import ExpensesAnalyzes from './ExpensesAnalyzes.vue';

const selectedTab = ref('list');

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);
const reloadChart = ref(false);

onMounted(() => {
  const tabSettings = localStorage.getItem('expense-tab');
  if (tabSettings) {
    selectedTab.value = JSON.parse(tabSettings);
  }
});

const onEditExpense = (index: number) => {
  emit('onEditExpense', index);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', index);
};

const onClickTab = (tab: string) => {
  if (tab !== selectedTab.value) {
    selectedTab.value = tab;
    localStorage.setItem('expense-tab', JSON.stringify(tab));
  }
};
</script>
