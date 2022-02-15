<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  async created() {
    console.log((await axios.get('/api/account/session')).data)
  },
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/logout')
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  #app
    div
    #nav
      .logo
        router-link(to= '/')
          img(src="@/assets/logo3.png")
      .search
        input(type="text" class="searchTerm" placeholder="Search for food, cuisine or restaurant.")
        button(type="submit" class="searchButton")
          img(src="https://img.icons8.com/color/search")
      .box
        router-link(to="/restaurants") Restaurant List
      .box(v-if='!user')
        router-link(to='/register') Register
      .box(v-if='!user')
        router-link(to='/login') Login
      .box(v-if='user')
        router-link(to='/logout') Logout
    div
    #section
      .thirdBox(v-if='user')
        h4 {{user.name.toUpperCase()}}
      .firstBox
        h4 MY FOOD BASKET
      .secondBox
        div
          img(src="https://img.icons8.com/080808/shopping-basket")
          span Your basket is empty.

    #aside
      .asideOuterBox
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
  background-image: linear-gradient(to bottom right, rgb(252, 6, 137) 20%, rgb(249, 105, 14));

  .box {
    display: inline-flex;
    vertical-align: top;
    margin-top: 0.5rem;
    float: right;
    text-align: center;
    padding: 1rem;
    a {
      font-weight: bold;
      text-decoration: none;
      color: rgb(248, 236, 246);
      &.router-link-exact-active {
        color: #0f0b07;
      }
    }
  }
  .logo {
    display: inline-flex;
  }
  .search {
    display: inline-flex;
    width: 30%;
    vertical-align: top;
    padding-left: 20rem;
    padding-top: 1rem;
    text-align: center;
    .searchTerm {
      width: 100%;
      border: 1px solid #727070;
      border-right: none;
      padding: 5px;
      height: 20px;
      border-radius: 5px 0 0 5px;
      outline: none;
      color: #9dbfaf;
    }
    .searchTerm:focus {
      color: #727070;
    }
    .searchButton {
      width: 40px;
      height: 32px;
      border: 1px solid #727070;
      background: #b9def0;
      text-align: center;
      color: #fff;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      font-size: 20px;
    }
    img {
      width: 20px;
      height: 20px;
    }
    wrap {
      width: 30%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
#section {
  text-align: center;
  float: left;
  margin: 0 1.5%;
  width: 20%;
  height: 100%;
  .thirdBox {
    border: 1px solid #333;
    background-image: linear-gradient(to bottom right, rgb(255, 20, 147) 10%, rgb(249, 105, 14));
    margin-top: 2rem;
    height: 50px;
  }
  .firstBox {
    margin-top: 2rem;
    border: 1px solid #333;
    background-image: linear-gradient(to bottom right, rgb(255, 20, 147) 10%, rgb(249, 105, 14));
  }
  .secondBox {
    border: 1px solid #333;
    background-image: gray;
    min-height: 10rem;
    padding-top: 2rem;
    img {
      padding: 1rem;
      display: inline-flex;
    }
    span {
      display: inline-flex;
      vertical-align: top;
      padding-top: 2.5rem;
    }
  }
}
#aside {
  float: right;
  margin: 0 1.5%;
  width: 70%;
  height: 100%;
  .asideOuterBox {
    margin-top: 2rem;
    border: 1px solid #333;
    border-radius: 0.3rem;
    height: 100%;
  }
}
</style>
