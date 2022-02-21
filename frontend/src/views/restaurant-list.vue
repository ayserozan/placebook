<script>
//import axios from "axios";
import RestaurantCard from '@/components/restaurant-card.vue'
import Counter from '@/components/counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'RestaurantList',
  components: { Counter, RestaurantCard },
  data() {
    return {
      restaurants: [],
    }
  },

  async created() {
    console.log(this.$route)
    this.restaurants = await this.fetchRestaurants()
  },
  methods: {
    ...mapActions(['fetchRestaurants']),
  },
}
</script>

<template lang="pug">
  .home
    h1 Restaurant List
    div(v-for="restaurant in restaurants")
      router-link(:to="`/restaurants/${restaurant._id}`")
        RestaurantCard(:restaurant="restaurant" v-if="restaurant")
    Counter
</template>

<style lang="scss" scoped>
.home {
  a {
    font-weight: bold;
    text-decoration: none;
    color: rgb(248, 236, 246);
    &.router-link-exact-active {
      color: #0f0b07;
    }
  }
}
</style>
