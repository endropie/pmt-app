import { RouteRecordRaw } from 'vue-router';
import { auth, tenant, subtenant, middleware } from './middleware';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Landing.vue') },
    ],
  },
  {
    path: '/account',
    beforeEnter: [auth],
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/Index.vue') },
      { path: 'profile', component: () => import('pages/user/Profile.vue') },
      { path: 'tenant/register', component: () => import('pages/user/TenantRegister.vue') },
    ],
  },
  {
    path: '/distributor',
    beforeEnter: middleware({ auth, tenant }),
    component: () => import('layouts/TenantLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tenant/Index.vue') },
      { path: 'profile', component: () => import('pages/tenant/Profile.vue') },
      { path: 'kiosks/create', component: () => import('pages/tenant/subtenants/Register.vue') },
      { path: 'kiosks/:id', component: () => import('pages/tenant/subtenants/View.vue') },
      { path: 'kiosks', component: () => import('pages/tenant/subtenants/Index.vue') },
    ],
  },
  {
    path: '/agency',
    beforeEnter: middleware({ auth, subtenant }),
    component: () => import('layouts/SubtenantLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tenant/Index.vue') },
      { path: 'profile', component: () => import('pages/tenant/Profile.vue') },
      { path: 'kiosks/create', component: () => import('pages/tenant/subtenants/Register.vue') },
      { path: 'kiosks/:id', component: () => import('pages/tenant/subtenants/View.vue') },
      { path: 'kiosks', component: () => import('pages/tenant/subtenants/Index.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
