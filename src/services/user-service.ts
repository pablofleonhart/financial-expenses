import { AxiosError } from 'axios';
import { reactive } from 'vue';
import { User } from '../components/user/User';
import { api } from '../lib/axios';
import { refreshToken } from './token-manager';

export const account: User = reactive(new User());

export async function loadUserProfile() {
  // load profile
  await api
    .get('/me')
    .then((response) => {
      const { user } = response.data;
      account.name = user.name;
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        refreshToken();
        refreshToken();
      }
    });
}
