<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      backendError: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async submitLogin(e) {
      e.preventDefault();

      try {
        await this.login({
          email: this.email,
          password: this.password,
        });

        this.$router.push("/profile");
      } catch (e) {
        this.backendError = e.response.data.message;
      }
    },
  },
};
</script>

<template lang="pug">
.login
    form(@submit="submitLogin")
      h1 Log in to your account
      #email-content
        div
          label(for="email") Email:&nbsp;
        div
          input(v-model="email" id="email" type="email" placeholder="Your email" required)
      #password-content
        div
          label(for="password") Password:&nbsp;
        div
          input(v-model="password" id="password" type="password" placeholder="Your password" required)
      input(type="submit" text="Log in")
    div(v-if="backendError") {{ backendError }}
    div Don't have an account yet? <router-link to="/register">Register</router-link>
</template>

<style lang="scss" scoped>
.login {
  display: block;
  margin: 1rem 0;
  text-align: center;
  margin-left: 23rem;
  margin-right: 20rem;
  width: 20rem;
  height: 300px;
  div {
    label {
      float: left;
      width: 100px;
      text-align: left;
      padding-top: 10px;
    }
    input {
      float: right;
      padding-top: 10px;
    }
  }
}
</style>
