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
    ...mapState(['user', 'addProductToOrder', 'products', 'order']),
  },
}
</script>

<template lang="pug">
  #app
    #nav
      .logo
        router-link(to= '/')
          img(src="@/assets/logo3.png")
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
        img(src="https://img.icons8.com/080808/shopping-basket")
        span(v-if='!addProductToOrder') Your basket is empty.
        div(v-else)
          div(v-for="orderItem in order.orderItems")
            table(style='width:100%', border='1')
              tr
                td(style='width:60%; text-align: left;') {{orderItem.item.name}}
                td(style='width:20%') {{orderItem.quantity}}
                td(style='width:20%') {{orderItem.item.price}}
          table(style='width:100%', border='1' )
            tr
              td(style='font-weight:bold; width:80%; text-align: left;') Total
              td(style='width:20%') {{order.amount}}
          button(style='width: 80%; background: greenyellow;') Pay Now


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
    #itemList {
      text-align: center;
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
