<template>
  <div class="tabs flex h-8 w-full border-b border-primary-color-dark">
    <button
      class="login-button flex items-center h-full px-2 text-black hover:bg-secondary-color-dark hover:border-x hover:border-t hover:border-primary-color-dark"
      :class="{
        'bg-secondary-color-dark font-bold border-x border-t border-primary-color-dark':
          selectedTab === 'list',
      }"
      @click="onClickTab('list')"
    >
      Lista
    </button>
    <button
      class="login-button flex items-center h-full px-2 text-black hover:bg-secondary-color-dark hover:border-x hover:border-t hover:border-primary-color-dark"
      :class="{
        'bg-secondary-color-dark font-bold border-x border-t border-primary-color-dark':
          selectedTab === 'chart',
      }"
      @click="onClickTab('chart')"
    >
      Gráficos
    </button>
  </div>
  <expenses-list
    v-if="selectedTab === 'list'"
    class="flex mt-8"
    @on-edit-expense="onEditExpense"
    @on-delete-expense="onDeleteExpense"
  />
  <expenses-analyzes v-else />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ExpensesList from './ExpensesList.vue';
import ExpensesAnalyzes from './ExpensesAnalyzes.vue';

const selectedTab = ref('list');

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);

const onEditExpense = (index: number) => {
  emit('onEditExpense', index);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', index);
};

const onClickTab = (tab: string) => {
  if (tab !== selectedTab.value) {
    selectedTab.value = tab;
  }
};
</script>
