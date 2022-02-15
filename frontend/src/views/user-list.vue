<script>
//import axios from "axios";
import Counter from '@/components/counter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'UserList',
  components: { Counter },
  data() {
    return {
      users: [],
    }
  },

  async created() {
    console.log(this.$route)
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
  .home
    h1 User List
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{user.name}}
    Counter
</template>

<style lang="scss" scoped></style>
