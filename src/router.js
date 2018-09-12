import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('./views/Calculator.vue'),
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import('./views/Comments.vue'),
    },
  ],
});
