import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../src/views/HomeView.vue';
import QuizView from '../src/views/QuizView.vue';
import NotFound from '../src/views/NotFound.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView,
  },
  {
    path: '/:path(.*)', 
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
