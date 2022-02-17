import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
}

const store = new Vuex.Store({
  state: {
    user: null,
    product: null,
    count: 0,
    item: 0,
    addProductToOrder: [],
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      console.log({ user })
      state.user = user
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    /*async createOrder({ commit }, { orderItems }) {
      await axios.post('/api/orders', { orderItems })
    },*/
    async createOrder(store, orderItem) {
      await axios.post('/api/orders', { orderItem })
    },
    async fetchRestaurant(store, id) {
      const restaurantRequest = await axios.get(`/api/restaurants/${id}`)
      return restaurantRequest.data
    },
    async fetchRestaurants() {
      const restaurantsRequest = await axios.get('/api/restaurants')
      return restaurantsRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },
    async createOrder() {
      const orderRequest = await axios.get('/api/orders')
      return orderRequest.data
    },
    /*async addProductToOrder({ commit }) {
      const product = await axios.get('/api/')
    },*/
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
  },
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
