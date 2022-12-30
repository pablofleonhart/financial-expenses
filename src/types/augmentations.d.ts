import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

type MiddlewareOptions = {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
};

type Middleware = (
  options: MiddlewareOptions
) =>
  | RouteLocationRaw
  | boolean
  | string
  | Promise<RouteLocationRaw | boolean | string>;

declare module 'vue-router' {
  interface RouteMeta {
    middlewares?: Middleware[];
    moduleComponentName?: string;
  }
}
