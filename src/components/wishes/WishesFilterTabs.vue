<template>
  <ul class="wish-filter-tabs flex h-8 w-full border-b border-neutral-color">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.id === selectedTab,
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
import { filterWishes, selectedWishStatus } from '../../services';

const tabItems = [
  { id: 0, name: 'Abertos' },
  { id: 1, name: 'Concluídos' },
];
const selectedTab = computed(() => selectedWishStatus.id);

const filterItems = (tab: any) => {
  filterWishes(tab);
};
</script>
