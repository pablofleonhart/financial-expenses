<template>
  <div
    class="flex justify-end h-14 w-full bg-primary-color border-b border-primary-color-dark"
  >
    <img
      v-if="user?.avatar?.url"
      class="avatar object-contain h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 cursor-pointer"
      :src="user?.avatar?.url"
      @click="toggleProfileMenu"
    />
    <user-icon
      v-else
      class="avatar h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 cursor-pointer"
      @click="toggleProfileMenu"
    />
  </div>
  <profile :show-profile-menu="showProfile" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Account } from './components/accounts/Account';
import { account } from './services';
import UserIcon from './assets/UserIcon.vue';
import Profile from './components/profile/Profile.vue';

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
