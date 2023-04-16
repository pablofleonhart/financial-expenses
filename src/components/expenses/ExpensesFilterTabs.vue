<template>
  <ul class="tabs flex gap-4 h-8 w-full border-b border-neutral-color">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.name === selectedTab,
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
