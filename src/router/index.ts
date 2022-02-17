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
  { path: '/', name: 'login', component: Login, },
  { path: '/createTable', name: 'createTable', component: CreateTable },
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

router.beforeEach((to, from) => {
  let isAuthenticated = false;
  if (localStorage.getItem('login'))
    isAuthenticated = true;
  else
    isAuthenticated = false;

  if ((to.path == '/' && !isAuthenticated) || (to.path == '/createTable' && isAuthenticated)) {
    return true;
  }
  else if ((to.path == '/createTable' && !isAuthenticated) || (to.path == '/' && isAuthenticated)) {
    return false;
  }
  else {
    return false;
  }
})

export default router
