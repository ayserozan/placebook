<script>
//import axios from "axios";
import Counter from "@/components/counter.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  components: { Counter },
  data() {
    return {
      users: [],
    };
  },

  async created() {
    console.log(this.$route);
    this.users = await this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchUsers", "goLive"]),
  },
  computed: {
    ...mapState(["isLive"]),
  },
};
</script>

<template lang="pug">
  .home
    h1 User List
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{user.name}}
    Counter
    button(@click='goLive') Go Live
    div(v-if='isLive')
        h3 Live Stream
</template>

<style lang="scss" scoped></style>
