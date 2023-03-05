<template>
  <div
    class="flex justify-between h-14 w-full bg-primary-color-300 border-b border-primary-color-700"
  >
    <span class="page-title flex items-center ml-4 font-bold text-xl">
      {{ currentPage }}
    </span>
    <div class="flex gap-4">
      <component
        class="cursor-pointer flex items-center justify-center h-11 w-11 my-1 p-2 rounded-3xl hover:bg-primary-color-700"
        :is="getThemeIcon()"
        @click="toggleTheme"
      />
      <div
        class="avatar flex items-center justify-center h-11 w-11 my-1 mr-4 rounded-3xl border-2 border-primary-color-700 text-xl cursor-pointer hover:bg-primary-color-700"
        @click="toggleProfileMenu"
      >
        {{ getInitials(account.name) }}
      </div>
    </div>
  </div>
  <profile :show-profile-menu="showProfile" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { account, reloadCharts } from './services';
import Profile from './components/profile/Profile.vue';
import { getInitials } from './utils/string-utils';

const route = useRoute();
const showProfile = ref(false);
const currentPage = ref('Home');
const darkTheme = ref(false);

const getThemeIcon = () => {
  return darkTheme.value ? 'ph-moon' : 'ph-sun';
};

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value;
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('dark-theme', JSON.stringify(darkTheme.value));
  reloadCharts.value = !reloadCharts.value;
};

const toggleProfileMenu = (event: Event) => {
  event.stopPropagation();
  showProfile.value = !showProfile.value;
};

const closeProfileMenu = () => {
  showProfile.value = false;
};

window.addEventListener('click', closeProfileMenu);

onMounted(() => {
  const darkThemeConfig = localStorage.getItem('dark-theme');
  if (darkThemeConfig) {
    darkTheme.value = JSON.parse(darkThemeConfig);
    if (!darkTheme.value) {
      document.body.classList.toggle('dark-theme');
    }
  }
});

watchEffect(() => {
  currentPage.value = route.meta.title?.toString() || '';
});
</script>
