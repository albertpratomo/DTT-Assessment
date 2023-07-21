import housesPage from "@/pages/HousesPage.vue";
import aboutPage from "@/pages/AboutPage.vue";
import detailPage from "@/pages/DetailPage.vue";
import FormPage from "@/pages/FormPage.vue";
import myListingPage from "@/pages/MyListingPage.vue";

import * as VueRouter from "vue-router";

const routes = [
  {
    path: "/",
    name:'overview',
    component: housesPage,
  },
  {
    path: "/about",
    name:'about',
    component: aboutPage,
  },
  {
    path: "/mylisting",
    name: 'my listings',
    component: myListingPage,
  },
  {
    path: "/detail/:id",
    name:'detail',
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
