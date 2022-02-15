<script>
import { mapActions } from "vuex";

export default {
  name: "logout",
  data() {
    return {
      backendError: null,
    };
  },
  mounted(){
    this.logout()
  },
  methods: {
    ...mapActions(["logout"]),
    async submitLogout(e) {
      e.preventDefault();

      try {
        await this.logout();
        this.$router.push("/restaurants");
      } catch (e) {
        this.backendError = e.response.data.message;
      }
    },
  },
};
</script>

<template lang="pug">
    .logout
        h1 We are waiting again

</template>

<style lang="scss"
.logout{
    width: 20rem;
    height: 10rem;
}
scoped></style>
