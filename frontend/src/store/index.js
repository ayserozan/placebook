import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'increment count',
  SET_USER: 'set user',
  ADD_PRODUCT: 'add new product',
  ORDER_DETAIL: 'show order details',
}

const store = new Vuex.Store({
  state: {
    user: null,
    count: 0,
    item: 0,
    addProductToOrder: false,
    order: null,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      console.log({ user })
      state.user = user
    },
    [mutations.ADD_PRODUCT](state, val) {
      state.addProductToOrder = val
    },
    [mutations.ORDER_DETAIL](state, order) {
      console.log('Check mutation')
      console.log({ order })
      state.order = order
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT)
    },
    async createEmptyOrder(state) {
      const userId = store.state.user._id
      console.log(userId)
      await axios.post('/api/orders', { orderItems: [], userId })
    },
    async addNewPRoduct({ commit }, product) {
      const userId = store.state.user._id
      commit(mutations.ADD_PRODUCT, true)
      const orderId = store.state.user.myOrders[store.state.user.myOrders.length - 1]._id
      console.log(orderId)
      await axios.patch(`/api/orders/${orderId}`, {
        orderItems: { item: product._id, quantity: 1 },
        userId,
      })
      const order = await axios.get(`/api/orders/${orderId}`)
      commit(mutations.ORDER_DETAIL, order.data)
    },
    async fetchOrder(store, id) {
      console.log('I am inside fetch order')
      const orderRequest = await axios.get(`/api/orders/${id}`)
      return orderRequest.data
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
      commit(mutations.ORDER_DETAIL, null)
      commit(mutations.ADD_PRODUCT, false)
    },
  },
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
