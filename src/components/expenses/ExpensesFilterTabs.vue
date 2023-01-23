<template>
  <ul class="tabs flex h-8 w-full border-b border-primary-color-dark">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        class="login-button flex items-center h-full px-2 text-black hover:bg-secondary-color-dark hover:border-x hover:border-t hover:border-primary-color-dark"
        :class="{
          'bg-secondary-color-dark font-bold border-x border-t border-primary-color-dark':
            tab.name === selectedTab,
        }"
        @click="filterItems(tab)"
      >
        {{ tab.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  expensePeriods,
  filterExpenses,
  selectedExpensePeriod,
} from '../../services';

const tabItems = computed(() => expensePeriods);

const selectedTab = computed(() => selectedExpensePeriod.name);

const filterItems = (tab: any) => {
  filterExpenses(tab);
};
</script>
