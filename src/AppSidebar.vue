<template>
  <nav
    class="sidebar min-h-screen h-full pt-1 w-36 flex flex-col bg-primary-color border-r border-primary-color-dark"
    :class="{ 'sidebar-collapsed': collapsedMenu }"
  >
    <button
      class="button-toggle flex top-0 h-9 w-36 mt-1 mb-12 items-center hover:bg-primary-color-dark hover:text-white"
      :class="{ 'button-toggle-collapsed': collapsedMenu }"
      @click="toggleMenu"
    >
      <component
        :is="
          collapsedMenu
            ? 'ph-caret-circle-double-right'
            : 'ph-caret-circle-double-left'
        "
        class="button-toggle-icon w-8 h-8 mx-2"
      />
      <span v-if="!collapsedMenu"> Retrair </span>
    </button>
    <router-link
      v-for="item in sidebarItems"
      class="sidebar-item flex flex-row cursor-pointer h-9 w-full mb-4 items-center hover:bg-primary-color-dark hover:text-white"
      :key="item.id"
      :to="item.route"
    >
      <component :is="item.icon" class="sidebar-item-icon w-8 h-8 mx-2" />
      <span v-if="!collapsedMenu">
        {{ item.name }}
      </span>
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
}

const sidebarItems: Array<ISidebarItem> = [
  {
    id: 1,
    name: 'Faturas',
    icon: 'ph-receipt',
    route: 'revenues',
  },
  {
    id: 2,
    name: 'Gastos',
    icon: 'ph-currency-circle-dollar',
    route: 'expenses',
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

.button-toggle {
  &:hover {
    :deep(.button-toggle-icon) {
      * {
        stroke: #fff;
      }
    }
  }

  &-collapsed {
    width: 50px !important;
  }
}
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
