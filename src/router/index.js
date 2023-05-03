import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import House from '@/views/House.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'houses',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/house/:id',
      name: 'house',
      component: House
    }
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})

export default router
