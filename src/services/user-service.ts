import { AxiosError } from 'axios';
import { reactive } from 'vue';
import { User } from '../components/user/User';
import { api } from '../lib/axios';
import { refreshToken } from './token-manager';

export let account: User = reactive(new User());
let users: User[] = [];

export async function loadUsers() {
  await api
    .get('users')
    .then((response) => {
      users = response.data.users;
    })
    .catch((error: AxiosError) => {
      console.error('Not able to load users information', error);
    });
}

export async function loadUserProfile() {
  // load profile
  await api
    .get('/me')
    .then((response) => {
      const { user } = response.data;
      account = user;
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        refreshToken();
        refreshToken();
      }
    });
}

export function getUsernameByID(userID: string) {
  return users.filter((user) => user.id === userID)[0].name;
}
