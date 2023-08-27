import { reactive } from 'vue';
import { User } from '../components/user/User';
import { api } from '../lib/axios';

export const account: User = reactive(new User());

export async function loadUserProfile() {
  // load profile
  await api
    .get('/me')
    .then((response) => {
      const { user } = response.data;
      account.name = user.name;
    })
    .catch((error) => {
      console.error(error);
    });
}
