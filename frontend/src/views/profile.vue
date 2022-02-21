<script>
//import axios from "axios";
import Counter from '@/components/counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    this.users = await this.fetchUsers()
    await this.createEmptyOrder()
  },
  methods: {
    ...mapActions(['fetchUsers', 'createEmptyOrder']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .home
    h1 Welcome to {{user.name.toUpperCase()}} page
</template>

<style lang="scss" scoped></style>
