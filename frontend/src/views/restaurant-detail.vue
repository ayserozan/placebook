<script>
import RestaurantCard from "@/components/restaurant-card.vue";
import Counter from "@/components/counter.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "RestaurantDetail",
  components: { RestaurantCard, Counter },
  data() {
    return {
      restaurant: null,
    };
  },
  async created() {
    //const restaurantRequest = await axios.get(`/api/restaurants/`);
    //this.restaurant = restaurantRequest.data;
    console.log("This returns:", this.$route.params.id);
    this.restaurant = await this.fetchRestaurant(this.$route.params.id);
    console.log("Returned Restaurant:", this.restaurant);
  },
  methods: {
    ...mapActions(["fetchRestaurant"]),
  },
};
</script>

<template lang="pug">
  .about
    h1 This is a restaurant detail
    RestaurantCard(:restaurant="restaurant" v-if="restaurant")
    Counter
</template>
