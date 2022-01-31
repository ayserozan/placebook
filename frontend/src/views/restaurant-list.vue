<script>
//import axios from "axios";
import Counter from "@/components/counter.vue";
import { mapActions } from "vuex";

export default {
  name: "RestaurantList",
  components: { Counter },
  data() {
    return {
      restaurants: [],
    };
  },

  async created() {
    //const restaurantRequest = await axios.get("/api/restaurants");
    //this.restaurants = restaurantRequest.data;
    console.log(this.$route);
    this.restaurants = await this.fetchRestaurant();
  },
  methods: {
    ...mapActions(["fetchRestaurant"]),
  },
};
</script>

<template lang="pug">
  .home
    h1 Restaurant List
    div(v-for="restaurant in restaurants")
      router-link(:to="`/restaurants/${restaurant._id}`") {{restaurant.name}} and {{restaurant._id}}
    Counter
</template>

<style lang="scss" scoped></style>
