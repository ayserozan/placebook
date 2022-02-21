import Vue from 'vue'
import VueRouter from 'vue-router'
import RestaurantList from '../views/restaurant-list.vue'
import RestaurantDetail from '../views/restaurant-detail.vue'
import UserList from '../views/user-list.vue'
import Profile from '../views/profile.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Logout from '../views/logout.vue'

Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'UserList',
        component: UserList,
      },
      {
        path: '/restaurants',
        name: 'RestaurantList',
        component: RestaurantList, //() => import('../views/restaurant-list.vue'),
      },
      {
        path: '/restaurants/:id',
        name: 'RestaurantDetail',
        component: RestaurantDetail, //() => import(/* webpackChunkName: "about" */ '../views/restaurant-detail.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        },
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login')
          return next()
        },
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/logout')
          return next()
        },
      },
    ],
  })
}
