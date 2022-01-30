<script>
// @ is an alias to /src
import axios from "axios";
import RestaurantCard from "@/components/restaurant-card.vue";

export default {
  name: "Home",
  components: {
    RestaurantCard,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  async created() {
    const userRequest = await axios.get("/api/restaurants");

    this.restaurants = userRequest.data;
  },
};
</script>

<template lang="pug">
  .home
    restaurant-card(v-for="restaurant in restaurants" :restaurant="restaurant")
  </div>
</template>

<style lang="scss" scoped></style>
