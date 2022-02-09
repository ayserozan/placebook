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
          input(v-model="email" id="email" type="email" placeholder="Your email" required)
          label(for='email') Email
      #password-content
           input(v-model="password" id="password" type="password" placeholder="Your password" required)
           label(for="password") Password
      input(type="submit" text="Log in")
    div(v-if="backendError") {{ backendError }}
    div Don't have an account yet?&nbsp;<router-link to="/register"> Register</router-link>
</template>

<style lang="scss" scoped>
.login {
  display: block;
  text-align: center;
  margin-left: 20rem;
  margin-right: 20rem;
  width: 20rem;
  height: 300px;

  input {
    position: relative;
    width: 18rem;
    border-radius: 0.3rem;
    border-color: rgb(185, 182, 182);
    height: 2.5rem;
    text-align: center;
    background: orange;
  }
  div {
    width: 15rem;
    height: 3rem;
    display: flex;
    margin: 0.5rem;
    position: relative;
    font-size: 10px;
    label {
      position: absolute;
      background-color: white;
      font-size: 0.6rem;
      text-align: left;
      left: 1rem;
      top: -0.3rem;
    }
    input {
      position: absolute;
      border-color: rgb(185, 182, 182);
      text-align: left;
      background: white;
    }
  }
}
</style>
