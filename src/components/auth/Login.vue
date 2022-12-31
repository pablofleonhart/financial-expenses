<template>
  <div class="grid grid-cols-2 w-screen h-screen">
    <div>
      <img class="h-screen w-screen" src="../../assets/img/banner.jpg" />
    </div>
    <div
      class="flex flex-col justify-center items-center bg-primary-color w-full"
    >
      <span
        v-if="loginError.value !== ''"
        class="flex items-center justify-center w-3/4 text-sm h-8 mb-6 rounded-md bg-red-300 text-red-800"
      >
        {{ loginError.value }}
      </span>
      <div class="flex flex-col w-3/4">
        <span class="mb-2 text-sm"> Email </span>
        <input
          id="email-input"
          class="border border-secondary-color-dark p-2 h-10 w-full outline-0 rounded"
          type="email"
          placeholder="Enter your email"
          v-model="email"
        />
      </div>
      <div class="flex flex-col mt-6 w-3/4">
        <span class="mb-2 text-sm"> Password </span>
        <input
          id="password-input"
          class="border border-secondary-color-dark p-2 h-10 w-full outline-0 rounded"
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>
      <button
        class="login-button flex items-center mt-12 max-w-fit h-9 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
        @click="onLogin"
      >
        <span class="mr-2"> Log me in </span>
        <arrow-right class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import ArrowRight from '../../assets/ArrowRight.vue';
import { authorizeUser, errorMessage } from '../../services';

const email = ref('');
const password = ref('');

const loginError = computed(() => errorMessage);

const registerEnterEvent = (input: HTMLElement | null) => {
  if (!input) {
    return;
  }
  input.addEventListener('keypress', (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onLogin();
    }
  });
};

onMounted(() => {
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  registerEnterEvent(emailInput);
  registerEnterEvent(passwordInput);
});

const onLogin = () => {
  authorizeUser(email.value, password.value);
};
</script>

<style lang="scss" scoped>
.login-button {
  &:hover {
    :deep(.arrow-right) {
      line,
      polyline {
        stroke: #000;
      }
    }
  }
}
</style>
