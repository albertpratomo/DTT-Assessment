import housesPage from "@/pages/HousesPage.vue";
import aboutPage from "@/pages/AboutPage.vue";
import detailPage from "@/pages/DetailPage.vue";
import FormPage from "@/pages/FormPage.vue";

import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    component: housesPage,
  },
  {
    path: "/about",
    component: aboutPage,
  },
  {
    path: "/detail/:id",
    component: detailPage,
  },
  {
    path: '/edit/:id', 
    name: 'EditForm',
    component: FormPage,
  },
  {
    path: '/create',
    name: 'CreateForm',
    component: FormPage,
  },
  
];

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, linkExactActiveClass: "nav-item-active"
});

// export const $route = VueRouter.currentRoute;
