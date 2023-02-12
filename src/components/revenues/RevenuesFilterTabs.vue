<template>
  <ul
    class="revenue-filter-tabs flex h-8 w-full border-b border-primary-color-dark"
  >
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
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
