<script>
export default {
  name: 'RestaurantCard',
  props: ['restaurant'],
  methods: {
    getLogo(logo) {
      console.log(logo)
      return require(`@/assets/'${logo}`)
    },
  },
}
</script>

<template lang="pug">
    .box
        img(:src="require(`@/assets/${restaurant.logo}`)", style='width:100px; height:100px;')
        div
          h2 {{restaurant.name.toUpperCase()}}
          h3 {{restaurant.cuisines.map(cuisine => cuisine ).join(', ')}}
</template>

<style lang="scss" scoped>
.box {
  background-image: linear-gradient(to bottom right, rgb(255, 20, 147) 10%, rgb(249, 105, 14));
  display: inline-flex;
  width: 97%;
  margin-left: 1rem;
  border: 1px solid #333;
  h2 {
    text-indent: 1rem;
  }
  h3 {
    text-indent: 1rem;
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-size: 12px;
    color: #aaf;
  }
}
</style>
