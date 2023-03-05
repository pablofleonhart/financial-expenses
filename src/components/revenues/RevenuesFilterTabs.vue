<template>
  <ul class="revenue-filter-tabs flex h-8 w-full border-b border-neutral-color">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
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
import { filterRevenues, selectedRevenueStatus } from '../../services';

const tabItems = [
  { id: 0, name: 'Em aberto' },
  { id: 1, name: 'Histórico' },
];
const selectedTab = computed(() => selectedRevenueStatus.name);

const filterItems = (tab: any) => {
  filterRevenues(tab);
};
</script>
