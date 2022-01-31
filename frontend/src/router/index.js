import Vue from "vue";
import VueRouter from "vue-router";
import RestaurantList from "../views/restaurant-list.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RestaurantList",
    component: RestaurantList,
  },
  {
    path: "/restaurants/:id",
    name: "RestaurantDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/restaurant-detail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
