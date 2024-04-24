import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(`@/pages/Home.vue`),
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import(`@/pages/Favorites.vue`),
    meta: {
      title: 'Избранные товары'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
