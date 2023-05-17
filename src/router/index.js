import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import House from '@/views/House/House.vue'
import PostHouse from "@/views/PostHouse/PostHouse.vue";
import Edit from '@/views/Edit/Edit.vue'

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
      path: '/House/:id',
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
      name: 'Edit',
      component: Edit
    }
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link'
})

export default router
