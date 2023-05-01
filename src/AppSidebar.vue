<template>
  <nav
    class="sidebar min-h-screen h-full pt-1 w-40 flex flex-col bg-primary-color-300 border-r border-primary-color-700"
    :class="{ 'sidebar-collapsed': collapsedMenu }"
  >
    <div
      class="flex ml-1 mt-1 items-center text-secondary-color-700 cursor-pointer"
      @click="$router.push(sidebarItems[0])"
    >
      <ph-currency-circle-dollar
        class="flex rotate-[-20deg]"
        size="40"
        weight="fill"
      />
      <span v-if="!collapsedMenu" class="font-serif font-bold text-lg"
        >Meus Pila</span
      >
    </div>
    <button
      class="toggle-menu-button flex h-9 w-40 my-6 items-center hover:bg-primary-color-700"
      :class="{ 'toggle-menu-button-collapsed': collapsedMenu }"
      @click="toggleMenu"
    >
      <component
        :is="
          collapsedMenu
            ? 'ph-caret-circle-double-right'
            : 'ph-caret-circle-double-left'
        "
        class="toggle-menu-button-icon w-8 h-8 mx-2"
      />
      <span v-if="!collapsedMenu"> Retrair </span>
    </button>
    <router-link
      v-for="item in sidebarItems"
      class="sidebar-item flex flex-col cursor-pointer"
      :key="item.id"
      :to="item.route"
    >
      <div
        class="flex items-center h-9 my-1 w-full hover:bg-primary-color-700"
        :class="{
          'pl-4': item.subItem && !collapsedMenu,
          'pl-1': item.subItem && collapsedMenu,
        }"
      >
        <component :is="item.icon" class="sidebar-item-icon w-8 h-8 mx-2" />
        <span v-if="!collapsedMenu">
          {{ item.name }}
        </span>
      </div>
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const collapsedMenu = ref(true);

interface ISidebarItem {
  id: number;
  name: string;
  icon: any;
  route: string;
  subItem?: boolean;
}

const sidebarItems: Array<ISidebarItem> = [
  {
    id: 0,
    name: 'Dashboard',
    icon: 'ph-presentation-chart',
    route: '/',
  },
  {
    id: 1,
    name: 'Faturas',
    icon: 'ph-receipt',
    route: 'revenues',
  },
  {
    id: 2,
    name: 'Gastos',
    icon: 'ph-coins',
    route: 'expenses',
  },
  {
    id: 3,
    name: 'Fixos',
    icon: 'ph-anchor',
    route: 'fixed-expenses',
    subItem: true,
  },
  {
    id: 4,
    name: 'Variáveis',
    icon: 'ph-wave-triangle',
    route: 'variable-expenses',
    subItem: true,
  },
  {
    id: 5,
    name: 'Viagens',
    icon: 'ph-airplane-tilt',
    route: 'travels',
  },
  {
    id: 6,
    name: 'Carteiras',
    icon: 'ph-wallet',
    route: 'wallet',
  },
  {
    id: 7,
    name: 'Planos',
    icon: 'ph-lightbulb',
    route: 'wishes',
  },
];

onMounted(() => {
  const menuOption = localStorage.getItem('collapsed-menu');
  if (menuOption) {
    collapsedMenu.value = JSON.parse(menuOption);
  }
});

const toggleMenu = () => {
  collapsedMenu.value = !collapsedMenu.value;
  localStorage.setItem('collapsed-menu', JSON.stringify(collapsedMenu.value));
};
</script>

<style lang="scss" scoped>
.sidebar-collapsed {
  width: 50px !important;
}

.toggle-menu-button {
  &-collapsed {
    width: 50px !important;
  }
}
.sidebar-item {
  &.router-link-active > div {
    background-color: var(--primary-color-700);
  }
}
</style>
