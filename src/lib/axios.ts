import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pfl-expenses-api.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Set-Cookie',
  },
});
