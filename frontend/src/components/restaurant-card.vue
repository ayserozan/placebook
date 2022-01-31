<script>
export default {
  name: "RestaurantCard",
  props: ["restaurant"],
};
</script>

<template lang="pug">
    .box
        h2 Restaurant Information:
        h2 {{restaurant.name}}
        h3 {{restaurant.cuisines}}
</template>

<style lang="scss" scoped>
.box {
  margin-left: 25rem;
  margin-right: 15rem;
  border: 1px solid #333;
  background-image: linear-gradient(
    to bottom right,
    rgb(255, 20, 147) 10%,
    rgb(249, 105, 14)
  );
  border-radius: 0.3rem;
  text-indent: 100px;

  h3 {
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 12px;
    color: #aaf;
  }
}
</style>
