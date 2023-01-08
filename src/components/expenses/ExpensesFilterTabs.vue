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
import { getFirstDayOfMonth, getLastDayOfMonth } from '../../utils';
import { filterExpenses, selectedPeriod } from '../../services';

const tabItems = [
  {
    name: 'Dezembro/22',
    from: new Date('2022-12-01'),
    to: new Date('2022-12-31'),
  },
  {
    name: 'Janeiro/23',
    from: getFirstDayOfMonth(),
    to: getLastDayOfMonth(),
  },
];

const selectedTab = computed(() => selectedPeriod.name);

const filterItems = (tab: any) => {
  filterExpenses(tab);
};
</script>
