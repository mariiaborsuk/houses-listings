import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import House from '@/views/House.vue'
import PostHouse from "@/views/PostHouse.vue";
import Edit from '@/views/Edit.vue'

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
      component: House,
    },
    {
      path: '/createHouse',
      name: 'create',
      component: PostHouse
    },
    {
      path: '/editHouse/:id',
      name: 'edit',
      component: Edit
    }
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})

export default router
