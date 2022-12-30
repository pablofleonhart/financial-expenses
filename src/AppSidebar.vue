<template>
  <nav class="sidebar-list h-screen flex flex-col bg-primary-color border-r border-primary-color-dark">
    <router-link
      v-for="item in sidebarItems"
      class="sidebar-item flex flex-row cursor-pointer h-9 w-full mt-4 items-center hover:bg-primary-color-dark hover:text-white"
      :key="item.id"
      :to="item.route"
    >
      <component :is="item.icon" class="sidebar-item-icon w-8 h-8 mx-2" />
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
import CoinsIcon from '../src/assets/CoinsIcon.vue';
import CurrencyIcon from '../src/assets/CurrencyIcon.vue';
import RevenueIcon from './assets/RevenueIcon.vue';

interface ISidebarItem {
  id: number;
  name: string;
  icon: any;
  route: string;
}

const sidebarItems: Array<ISidebarItem> = [
  {
    id: 1,
    name: 'Faturas',
    icon: RevenueIcon,
    route: 'revenues',
  },
  {
    id: 2,
    name: 'Gastos',
    icon: CurrencyIcon,
    route: 'expenses',
  },
  {
    id: 3,
    name: 'Investimentos',
    icon: CoinsIcon,
    route: 'investments',
  },
];
</script>

<style lang="scss" scoped>
.sidebar-item {
  &.router-link-active {
    background-color: #026670;
    color: #fff;
    :deep(.sidebar-item-icon) {
      * {
        stroke: #fff;
      }
    }
  }

  &:hover {
    :deep(.sidebar-item-icon) {
      * {
        stroke: #fff;
      }
    }
  }
}
</style>
