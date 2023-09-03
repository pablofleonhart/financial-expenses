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
          :class="{ 'border border-red-500': errors.email }"
          type="email"
          placeholder="Informe seu email"
          v-model="email"
        />
        <span
          v-if="errors.email"
          class="bg-red-200 text-red-600 rounded-lg pl-2 mt-2"
          >{{ errors.email }}</span
        >
      </div>
      <div class="flex flex-col mt-6 w-3/4">
        <span class="mb-2 text-sm"> Senha </span>
        <input
          id="password-input"
          class="bg-neutral-color-700 border border-primary-color-700 p-2 h-10 w-full outline-0 rounded"
          :class="{ 'border border-red-500': errors.password }"
          type="password"
          placeholder="Informe sua senha"
          v-model="password"
        />
        <span
          v-if="errors.password"
          class="bg-red-200 text-red-600 rounded-lg pl-2 mt-2"
          >{{ errors.password }}</span
        >
      </div>
      <button
        class="login-button flex items-center mt-12 max-w-fit h-9 px-2 rounded bg-secondary-color-300 border-2 border-secondary-color-300 hover:bg-secondary-color-700 hover:border-secondary-color-700"
        @click="onLogin"
      >
        <span class="mr-2"> Login </span>
        <ph-sign-in size="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue';
import router from '../../router';
import {
  authenticateUser,
  errorMessage,
  loadInitialData,
} from '../../services';
import { DEFAULT_ROUTE } from '../common/config';

const email = ref('');
const password = ref('');
const loginError = computed(() => errorMessage);
const errors: Record<string, any> = ref({});
let setInitialFocus = true;
let emailInput: HTMLElement | null = null;
let passwordInput: HTMLElement | null = null;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationRules = {
  email: [
    (value: string) => (value ? '' : 'Email precisa ser informado'),
    (value: string) => (emailRegex.test(value) ? '' : 'Email inválido'),
  ],
  password: [(value: string) => (value ? '' : 'Senha precisa ser informada')],
};

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
  emailInput = document.getElementById('email-input');
  passwordInput = document.getElementById('password-input');
  registerEnterEvent(emailInput);
  registerEnterEvent(passwordInput);
  emailInput?.focus();
});

onUpdated(() => {
  if (setInitialFocus && emailInput) {
    emailInput.focus();
    setInitialFocus = false;
  }
});

const onLogin = async () => {
  errors.value = {};

  Object.entries(validationRules).forEach(([field, rules]) => {
    const errorMessages = rules
      // @ts-ignore
      .map((rule) => rule(field === 'email' ? email.value : password.value))
      .filter((message) => message);
    if (errorMessages.length > 0) {
      errors.value[field] = errorMessages[0];
    }
  });

  if (Object.keys(errors.value).length === 0) {
    const response = await authenticateUser(email.value, password.value);
    if (response) {
      errors.value.email = response;
    } else {
      await router.push(DEFAULT_ROUTE);
    }
  }
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
