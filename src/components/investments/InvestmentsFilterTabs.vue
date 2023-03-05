<template>
  <ul class="revenue-filter-tabs flex h-8 w-full border-b border-neutral-color">
    <li v-for="tab in tabItems" :key="tab.name">
      <button
        :key="tab.id"
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.name === selectedTab.name,
        }"
      >
        {{ tab.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const tabItems = [{ id: 0, name: 'Todos' }];
const selectedTab = tabItems[0];
</script>
