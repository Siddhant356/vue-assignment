import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import CreateTable from '@/views/CreateTable.vue'



// const loginCond = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

//   if (localStorage.getItem('login')) {
//     next();

//   }
//   else {
//     next(to);

//   }
// }

// const tableCond = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

//   if (localStorage.getItem('login')) {
//     next(to);

//   }
//   else {
//     next();

//   }
// }





const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'login', component: Login, meta: { auth: false } },
  { path: '/createTable', name: 'createTable', component: CreateTable, meta: { auth: true } },
  {
    path: '/:catchAll(.*)', redirect: () => {
      if (localStorage.getItem('login')) {
        return '/createTable';
      } else {
        return '/';
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  if (localStorage.getItem('login'))
    isAuthenticated = true;
  else
    isAuthenticated = false;

  // if ((to.path == '/' && !isAuthenticated) || (to.path == '/createTable' && isAuthenticated)) {
  //   return true;
  // }
  // else if ((to.path == '/createTable' && !isAuthenticated) || (to.path == '/' && isAuthenticated)) {
  //   return false;
  // }
  // else {
  //   return false;
  // }
  if (to.meta.auth && !isAuthenticated) {
    next('/');
  } else if (!to.meta.auth && isAuthenticated) {
    next('/createTable');
  } else {
    next();
  }
})

export default router
