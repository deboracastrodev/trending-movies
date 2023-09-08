import { before } from 'node:test';
import { createRouter, createWebHistory } from 'vue-router';

const routes: any = [
  {
    path: "/",
    component: () => import("/src/pages/Base/BasePage.vue"),
    children: [
      {
        path: "/trending",
        component: () => import("/src/pages/Trendings/TrendingList.vue"),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;