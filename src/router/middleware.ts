import { useAccessable } from 'src/composables/accessable';
import { useAuth } from 'src/composables/auth';
import { NavigationGuardNext, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
// import { NavigationGuardNext } from 'vue-router';


export const auth = async () => {

  const { authenticated } = useAuth();

  const authed = await authenticated();

  if (!authed) return '/';
}


export const accessable = async () => {

  const { authenticated } = useAuth();

  const { accessabled } = useAccessable();

  const authed = await authenticated();
  const accessed = await accessabled();

  if (!authed && !accessed) return false;
}

export const middleware = (ms: Record<string, CallableFunction>) => {
  console.warn('MIDDLEWARE', ms)

  return async function (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    console.warn('p', to, from, next);
    const map = Object.keys(ms).map((name: string) => {
      return new Promise((acc) => {
        acc(ms[name]());
      });
    });

    const result = await Promise.all(map);
    const v = result.find((x) => typeof x !== 'undefined') as RouteLocationRaw | string | Error;
    console.warn('result', v);
    next(v)
    // resolve(v)
    // return (v)
  }
}
