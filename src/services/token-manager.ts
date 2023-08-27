import { AxiosError } from 'axios';
import { updateAuthorizationHeader, api } from '../lib/axios';
import router from '../router';

let _accessToken: string | null = null;
let refreshTries = 0;

const initializeData = () => {
  const accessToken = localStorage.getItem('atk');
  if (accessToken) {
    _accessToken = JSON.parse(accessToken);
    updateAuthorizationHeader();
  }
};

export function storeToken(token: string) {
  _accessToken = token;
  localStorage.setItem('atk', JSON.stringify(token));
  updateAuthorizationHeader();
}

export function getToken(): string | null {
  return _accessToken ? `Bearer ${_accessToken}` : null;
}

export async function refreshToken(): Promise<void> {
  if (refreshTries > 0) {
    _accessToken = null;
    await router.push('/login');
  }
  refreshTries++;
  await api
    .patch('token/refresh')
    .then((response) => {
      storeToken(response.data.token);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
}

initializeData();
