<template>
  <div class="flex justify-end h-14 w-full bg-primary-color border-b border-primary-color-dark">
    <img v-if="user?.avatar?.url"
      class="avatar object-contain h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 cursor-pointer"
      :src="user?.avatar?.url"
    />
    <user-icon v-else
      class="avatar h-12 w-12 p-1 my-1 mr-2 rounded-3xl border-2 border-blue-400 cursor-pointer"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Account } from './components/accounts/Account';
import { account } from './services';
import UserIcon from './assets/UserIcon.vue';

const user = computed<Account>(() => account )
</script>