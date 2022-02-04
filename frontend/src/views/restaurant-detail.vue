<script>
import RestaurantCard from "@/components/restaurant-card.vue";
import MenuCard from "@/components/menu-card.vue";
import Counter from "@/components/counter.vue";
import { mapActions } from "vuex";

export default {
  name: "RestaurantDetail",
  components: { RestaurantCard, Counter, MenuCard },
  data() {
    return {
      restaurant: null,
    };
  },
  async created() {
    this.restaurant = await this.fetchRestaurant(this.$route.params.id);
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
      h1 Menus
      MenuCard(v-for="menu in restaurant.menus" :menu="menu")
      Counter
</template>

<style lang="scss">
h1 {
  text-align: center;
  color: #4d0a0a;
}
</style>
