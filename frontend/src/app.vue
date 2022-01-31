<template lang="pug">
  #app
    div
    #nav
      img(src="@/assets/logo.png")
      router-link(to="/") Restaurant List
    <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: right;
  background-image: linear-gradient(
    to bottom right,
    rgb(252, 6, 137) 20%,
    rgb(249, 105, 14)
  );
  a {
    font-weight: bold;
    color: #2c3e50;
    text-align: left;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  img {
    padding-right: 70rem;
    text-align: left;
  }
}
</style>
