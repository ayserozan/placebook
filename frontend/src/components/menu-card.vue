<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MenuCard',
  props: ['menu'],
  methods: {
    ...mapActions(['addNewPRoduct']),
  },
  computed: {
    ...mapState(['item', 'user']),
  },
}
</script>

<template lang="pug">
    .box
      .menuInfo
        h2 {{menu.name.toUpperCase()}}
      .product(v-for="product in menu.product")
        h3 - {{product.name}}
        h3 {{product.price}} €
        div
          button(@click='addNewPRoduct(product)') +
</template>

<style lang="scss" scoped>
.box {
  margin-left: 1rem;
  margin-right: 1rem;

  .menuInfo {
    margin-top: 1rem;
    border: 1px solid #333;
    background-color: rgb(245, 222, 218);
  }
  .product {
    border: 1px solid #333;
    background-color: rgb(253, 252, 249);
    h3 {
      font-family: 'Lucida Console', 'Courier New', monospace;
      font-size: 12px;
      color: rgb(38, 38, 168);
    }
    div {
      text-align: end;
    }
  }
}
</style>
