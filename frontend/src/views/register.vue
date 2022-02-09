<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      name: "",
      age: null,
      email: "",
      password: "",

      backendError: null,
    };
  },
  methods: {
    ...mapActions(["register"]),
    async submitLogin(e) {
      e.preventDefault();

      try {
        await this.register({
          name: this.name,
          age: this.age,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/login");
      } catch (e) {
        this.backendError = e.response.data.message;
      }
    },
  },
};
</script>

<template lang="pug">
.register
    form( @submit="submitLogin")
      h1 Create a new account
        #name-content
            input(v-model="name" id="name" type="text" placeholder="Your name" required)
            label(for="name") Name:&nbsp;
        #age-content
            input(v-model="age" id="age" type="number" placeholder="Your age" required)
            label(for="age") Age:&nbsp;
        #email-content
            input(v-model="email" id="email" type="email" placeholder="Your email" required)
            label(for="email") Email:&nbsp;
        #password-content
            input(v-model="password" id="password" type="password" placeholder="Your password" required)
            label(for="password") Password:&nbsp;
        #submit-button
            input(type="submit" value="Register")
        div(v-if="backendError") {{ backendError }}
        div Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style lang="scss" scoped>
.register {
  display: block;
  text-align: left;
  margin-left: 20rem;
  div {
    width: 18rem;
    height: 2rem;
    text-align: center;
    font-size: 10px;
    padding: 1rem;
    left: 50%;
    label {
      position: relative;
      background-color: white;
      font-size: 0.6rem;
      left: -7.3rem;
      top: -3.1rem;
      height: 1rem;
    }
    input {
      position: relative;
      height: 2.5rem;
      width: 18rem;
      border-radius: 0.3rem;
    }
  }
  #submit-button {
    input {
      background-color: orange;
    }
  }
}
</style>
