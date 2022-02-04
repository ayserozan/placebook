<script>
export default {
  name: "MenuCard",
  props: ["menu"],
};
</script>

<template lang="pug">
    .box
        h2 {{menu.name}}

        .product(v-for="product in menu.product")
          h3 - {{product.name}}

</template>

<style lang="scss" scoped>
.box {
  margin-left: 1rem;
  margin-right: 1rem;
  border: 1px solid #333;
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 139, 195) 10%,
    rgb(238, 160, 111)
  );
  border-radius: 0.3rem;

  h3 {
    font-family: "Lucida Console", "Courier New", monospace;
    font-size: 12px;
    color: rgb(38, 38, 168);
  }
}
</style>
