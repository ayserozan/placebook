import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import io from "socket.io-client";

Vue.use(Vuex);

const socket = io();

/*socket.on("hello world!", () => {
  console.log("we received mesage from the websocket server!");
});

setInterval(() => {
  const number = Math.random();
  console.log("I am sending out a request", number);
  socket.emit("new message", number, (res) => {
    console.log("this is a response: ", res);
  });

  socket.emit("another api", (res) => {
    console.log(res);
  });
}, 3000);*/

const mutations = {
  INCREMENT_COUNT: "increment count",
  SET_USER: "set user",
  SET_LIVE: "set live stream",
};

const store = new Vuex.Store({
  state: {
    user: null,
    count: 0,
    isLive: false,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++;
    },
    [mutations.SET_USER](state, user) {
      state.user = user;
    },
    [mutations.SET_LIVE](state, live) {
      state.isLive = live;
    },
  },
  actions: {
    incrementCount({ commit }) {
      commit(mutations.INCREMENT_COUNT);
    },
    async fetchRestaurant(store, id) {
      const restaurantRequest = await axios.get(`/api/restaurants/${id}`);
      return restaurantRequest.data;
    },
    async fetchRestaurants() {
      const restaurantsRequest = await axios.get("/api/restaurants");
      return restaurantsRequest.data;
    },
    async fetchUsers() {
      const usersRequest = await axios.get("/api/users");
      return usersRequest.data;
    },
    async fetchSession({ commit }) {
      const user = await axios.get("/api/account/session");
      commit(mutations.SET_USER, user.data || null);
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post("/api/account/session", credentials);
        commit(mutations.SET_USER, user.data);
      } catch (e) {
        throw e;
      }
    },
    async register(store, user) {
      return axios.post("/api/account", user);
    },
    async logout({ commit }) {
      await axios.delete("/api/account/session");
      commit(mutations.SET_USER, null);
    },
    async goLive({ commit }) {
      socket.emit("go live", () => {
        commit(mutations.SET_LIVE, true);
      });
    },
  },
});

export default async function init() {
  await store.dispatch("fetchSession");
  return store;
}
