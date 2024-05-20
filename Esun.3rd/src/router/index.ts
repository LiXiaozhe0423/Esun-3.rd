import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import showData from '../views/showData.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/showData',
    name: 'showData',
    component: showData
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
