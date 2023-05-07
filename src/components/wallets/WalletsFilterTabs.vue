<template>
  <ul
    class="revenue-filter-tabs flex gap-6 h-8 w-full border-b border-neutral-color-off"
  >
    <li v-for="tab in tabItems" :key="tab.key">
      <button
        :key="tab.id"
        class="filter-tab"
        :class="{
          'filter-tab-selected': tab.key === selectedTab.key,
        }"
        @click="onSelectTab(tab)"
      >
        {{ tab.name }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { filterWallets, selectedWalletTab } from '../../services';

const emit = defineEmits(['change-tab']);

const tabItems = [
  { id: 0, key: 'balance', name: 'Contas' },
  { id: 1, key: 'investments', name: 'Investimentos' },
  { id: 2, key: 'transactions', name: 'Transações' },
];

const selectedTab = computed(() => selectedWalletTab);

// onMounted(() => {
//   const tabSettings = localStorage.getItem('wallet-tab');
//   if (tabSettings) {
//     selectedTab.value = JSON.parse(tabSettings);
//   }
// });

const onSelectTab = (tab: any) => {
  emit('change-tab', tab);
  // if (tab !== selectedTab.value) {
  //   // selectedTab.value = tab;
  //   // localStorage.setItem('wallet-tab', JSON.stringify(tab));
  // }

  filterWallets(tab);
  // }
};
</script>
