import { ref } from 'vue';
import router from '../router';
import { api } from '../lib/axios';
import { getToken, storeToken } from './token-manager';

export const errorMessage = ref('');

export const userAuthenticated = (): boolean => {
  return !!getToken();
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  let result = null;
  await api
    .post('/sessions', {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        storeToken(response.data.token);
      }
    })
    .catch((error) => {
      result = error.response.data.message;
    });

  return result;
};

export const logout = async () => {
  await router.push('/login');
};
