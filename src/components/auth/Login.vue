<template>
  <div
    class="grid grid-cols-2 min-h-screen min-w-full h-full w-full text-neutral-color"
  >
    <div
      class="flex justify-center items-center bg-primary-color-300 text-secondary-color-700"
    >
      <ph-currency-circle-dollar
        class="flex rotate-[-20deg]"
        size="80"
        weight="thin"
      />
      <span class="font-serif font-bold text-3xl">Meus Pila</span>
    </div>
    <div
      class="flex flex-col justify-center items-center bg-neutral-color-300 w-full"
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
          class="bg-neutral-color-700 border border-primary-color-700 p-2 h-10 w-full outline-0 rounded"
          type="email"
          placeholder="Enter your email"
          v-model="email"
        />
      </div>
      <div class="flex flex-col mt-6 w-3/4">
        <span class="mb-2 text-sm"> Password </span>
        <input
          id="password-input"
          class="bg-neutral-color-700 border border-primary-color-700 p-2 h-10 w-full outline-0 rounded"
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>
      <button
        class="login-button flex items-center mt-12 max-w-fit h-9 px-2 rounded bg-secondary-color-300 border-2 border-secondary-color-300 hover:bg-secondary-color-700 hover:border-secondary-color-700"
        @click="onLogin"
      >
        <span class="mr-2"> Log me in </span>
        <ph-sign-in size="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
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
  const darkThemeConfig = localStorage.getItem('dark-theme');
  if (darkThemeConfig) {
    const lightTheme = JSON.parse(darkThemeConfig);
    if (lightTheme) {
      document.body.classList.toggle('dark-theme');
    }
  }
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
