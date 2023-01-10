<template>
  <div
    class="flex justify-end h-14 w-full bg-primary-color border-b border-primary-color-dark"
  >
    <img
      v-if="user?.avatar?.url"
      class="avatar object-contain h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 cursor-pointer hover:bg-primary-color-dark"
      :src="user?.avatar?.url"
      @click="toggleProfileMenu"
    />
    <div
      v-else
      class="avatar flex items-center justify-center h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 text-2xl cursor-pointer hover:bg-primary-color-dark hover:text-white"
      @click="toggleProfileMenu"
    >
      {{ getInitials(account.name) }}
    </div>
  </div>
  <profile :show-profile-menu="showProfile" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Account } from './components/accounts/Account';
import { account } from './services';
import Profile from './components/profile/Profile.vue';
import { getInitials } from './utils/string-utils';

const user = computed<Account>(() => account);
const showProfile = ref(false);

const toggleProfileMenu = (event: Event) => {
  event.stopPropagation();
  showProfile.value = !showProfile.value;
};

const closeProfileMenu = () => {
  showProfile.value = false;
};

window.addEventListener('click', closeProfileMenu);
</script>
