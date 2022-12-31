import { Router } from 'vue-router';
import { userAuthenticated } from '../services';
import { DEFAULT_ROUTE } from '../components/common/config';

export const isAuthenticated = async ({ to }: any) => {
  const isAuthenticated = userAuthenticated();
  if (isAuthenticated) {
    return true;
  } else {
    return { path: '/login', query: { redirectTo: to.path } };
  }
};

export const isRootAuthenticated = async () => {
  const isAuthenticated = userAuthenticated();

  if (isAuthenticated) {
    return { path: DEFAULT_ROUTE };
  } else {
    return { path: '/login' };
  }
};

export const isNotAuthenticated = async () => {
  const isAuthenticated = userAuthenticated();
  if (isAuthenticated) {
    return { path: DEFAULT_ROUTE };
  } else {
    return true;
  }
};

export const registerMiddlewares = (router: Router) => {
  router.beforeEach(async (to, from) => {
    const middlewares = to.meta.middlewares;

    if (!middlewares) {
      return true;
    }

    for (const middleware of middlewares) {
      const result = await middleware({ to, from });
      if (
        typeof result === 'object' ||
        typeof result === 'string' ||
        result === false
      ) {
        return result;
      }
    }
  });
};
