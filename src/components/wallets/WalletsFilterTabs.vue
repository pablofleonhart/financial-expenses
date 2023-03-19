<template>
  <ul class="revenue-filter-tabs flex h-8 w-full border-b border-neutral-color">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.name === selectedTab,
        }"
        @click="filterWallets(tab)"
      >
        {{ tab.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { filterWallets, selectedWalletType } from '../../services';

const tabItems = [
  { id: 0, name: 'Saldos' },
  { id: 1, name: 'Investimentos' },
];
const selectedTab = computed(() => selectedWalletType.name);
</script>
