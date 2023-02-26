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
            tab.name === selectedTab.name,
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
