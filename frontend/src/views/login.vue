<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      backendError: null,
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitLogin(e) {
      e.preventDefault()

      try {
        await this.login({
          email: this.email,
          password: this.password,
        })

        this.$router.push('/profile')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
.login
    form(@submit="submitLogin")
      h1 Log in to your account
      #email-content
          input(v-model="email" id="email" type="email" placeholder="Your email" required)
          label(for='email') Email
      #password-content
           input(v-model="password" id="password" type="password" placeholder="Your password" required)
           label(for="password") Password
      input(type="submit" value="Log in")
    div(v-if="backendError") {{ backendError }}
    div Don't have an account yet?&nbsp;<router-link to="/register"> Register</router-link>
</template>

<style lang="scss" scoped>
.login {
  width: 20rem;
  height: auto;
  text-align: center;
  margin: auto;
  div {
    padding: 0.5rem;
    text-align: center;
    font-size: 10px;
    padding: 0.5rem;
  }
  input {
    position: relative;
    width: 19.5rem;
    border-radius: 0.3rem;
    border-color: rgb(185, 182, 182);
    height: 2.5rem;
    background: orange;
    margin-top: 0.5rem;
  }
  #email-content,
  #password-content {
    position: relative;
    margin-top: 0.5rem;
    input {
      background-color: whitesmoke;
      width: 19rem;
    }
    label {
      position: absolute;
      background-color: white;
      text-align: left;
      left: 1rem;
      top: 0.8rem;
    }
  }
}
</style>
