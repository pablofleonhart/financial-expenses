import { addAuthorizationHeader } from '../lib/axios';

let _accessToken: string | null = null;

const initializeData = () => {
  const accessToken = localStorage.getItem('atk');
  if (accessToken) {
    _accessToken = JSON.parse(accessToken);
  }
  addAuthorizationHeader();
};

export function storeToken(token: string) {
  _accessToken = token;
  localStorage.setItem('atk', JSON.stringify(token));
}

export function getToken(): string | null {
  return _accessToken ? `Bearer ${_accessToken}` : null;
}

initializeData();
