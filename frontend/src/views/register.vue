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
      #register-box
        #name-content
          div
            label(for="name") Name:&nbsp;
          div
            input(v-model="name" id="name" type="text" placeholder="Your name" required)
        #age-content
          div
            label(for="age") Age:&nbsp;
          div
            input(v-model="age" id="age" type="number" placeholder="Your age" required)
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
        #submit-button
          div
            input(type="submit" value="Register")
        div(v-if="backendError") {{ backendError }}
        div Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style lang="scss" scoped>
.register {
  display: block;
  margin: 1rem 0;
  text-align: center;
  #register-box {
    margin-left: 23rem;
    margin-right: 20rem;
    width: 20rem;
    height: 300px;
    #age-content,
    #email-content,
    #password-content {
      padding-top: 3rem;
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
    #name-content {
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
    #submit-button {
      margin-top: 5rem;
      margin-left: 2rem;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }
  }
}
</style>
