import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const mutations = {
  INCREMENT_COUNT: "increment count",
};

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++;
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT);
    },
    async fetchRestaurant(id) {
      const restaurantRequest = await axios.get(`/api/restaurants/${id}`);
      return restaurantRequest.data;
    },
    async fetchRestaurant() {
      const restaurantsRequest = await axios.get("/api/restaurants");
      return restaurantsRequest.data;
    },
  },
  modules: {},
});
