import { reactive, ref } from 'vue';
import {
  useUpdateAccountMutation,
  useGetAccountByEmailQuery,
  usePublishAccountMutation,
} from '../graphql/generated';
import { compare, encrypt } from '../utils';
import { Account } from '../components/accounts/Account';
import router from '../router';
import { DEFAULT_ROUTE, EXPIRATION_TIME } from '../components/common/config';
import { api } from '../lib/axios';

let sessionStart = 0;
export const errorMessage = ref('');
export let account: Account = reactive(new Account());

const initializeData = () => {
  const userAccount = localStorage.getItem('userAccount');
  if (userAccount) {
    const localSessionStart = localStorage.getItem('sessionStart');
    sessionStart = localSessionStart ? JSON.parse(localSessionStart) : 0;
    if (sessionStart > new Date().getTime()) {
      Object.assign(account, JSON.parse(userAccount));
    } else {
      sessionStart = 0;
    }
  }
};

export const userAuthenticated = (): boolean => {
  const isAuth = account && sessionStart > new Date().getTime();

  if (!isAuth) {
    localStorage.removeItem('userAccount');
    localStorage.removeItem('sessionStart');
  }

  return isAuth;
};

const publishAccount = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Account ID invalid');
  }
  const { mutate: publishAccount } = usePublishAccountMutation({});
  publishAccount({ id });
};

export const authorizeUser = async (email: string, password: string) => {
  await api.post('/sessions', {
    email: email,
    password: password,
  });

  if (userAuthenticated()) {
    return;
  }

  const { onResult } = useGetAccountByEmailQuery({ email });

  onResult(async (result) => {
    if (result.data.account) {
      const passwordValid = compare(
        `_${password}`,
        result.data.account.password
      );

      if (passwordValid) {
        account = result.data.account;
        localStorage.setItem(
          'userAccount',
          JSON.stringify({
            ...account,
            password: '',
          })
        );
        sessionStart = Date.now() + EXPIRATION_TIME;
        localStorage.setItem('sessionStart', JSON.stringify(sessionStart));
        await router.push(DEFAULT_ROUTE);
      } else {
        errorMessage.value = 'Wrong email or password';
      }
    } else {
      errorMessage.value = 'Forbidden access';
    }
  });
};

export const changePassword = (account: Account, newPassword: string) => {
  const { mutate: updateAccount, onDone } = useUpdateAccountMutation({});
  updateAccount({
    id: account.id,
    name: account.name,
    email: account.email,
    password: encrypt(newPassword),
  });

  onDone(() => {
    publishAccount(account.id);
  });
};

export const logout = async () => {
  sessionStart = 0;
  await router.push('/login');
};

initializeData();
