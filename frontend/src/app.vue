<script>
import axios from "axios";

export default {
  name: "App",
  async created() {
    console.log((await axios.get("/api/account/session")).data);
  },
};
</script>

<template lang="pug">
  #app
    div
    #nav
      router-link(to= '/')
        img(src="@/assets/logo.png")
      router-link(to="/restaurants") Restaurant List
      .box
        router-link(to='/login') Login
      .box
        router-link(to='/register') Register
    div
    #section
      .box
        .firstBox
          h4 MY FOOD BASKET
        .secondBox
          div
            img(src="https://img.icons8.com/080808/shopping-basket")
            span Your basket is empty.
    #aside
      .box
        router-view
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
  box {
    border: 1px solid #333;
    border-radius: 0.3rem;
  }
}
#section {
  text-align: center;
  float: left;
  margin: 0 1.5%;
  width: 20%;
  height: 100%;
  .box {
    .firstBox {
      margin-top: 2rem;
      border: 1px solid #333;
      background-image: linear-gradient(
        to bottom right,
        rgb(255, 20, 147) 10%,
        rgb(249, 105, 14)
      );
    }
    .secondBox {
      border: 1px solid #333;
      background-image: gray;
      min-height: 10rem;
      padding-top: 2rem;
      img {
        float: left;
        padding: 1rem;
      }
      span {
        float: center;
      }
    }
  }
}
#aside {
  float: right;
  margin: 0 1.5%;
  width: 70%;
  height: 100%;
  .box {
    margin-top: 2rem;
    border: 1px solid #333;
    border-radius: 0.3rem;
    height: 100%;
  }
}
</style>
