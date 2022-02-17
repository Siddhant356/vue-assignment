import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import CreateTable from '@/views/CreateTable.vue'


const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Login },
  { path: '/createTable', component: CreateTable },
  // { path: '/:catchAll(.*)', redirect: '/' }
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

  if (to.path == '/' && !isAuthenticated)
    return true;
  else if (to.path == '/createTable' && isAuthenticated)
    return true;
  else
    return false;
})

export default router
