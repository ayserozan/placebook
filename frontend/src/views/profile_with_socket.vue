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
  /*async created() {
    this.users = await this.fetchUsers()
    await this.createOrder({ orderItems: [] })
  },*/
  methods: {
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
  },
}
</script>

<template lang="pug">
  .home
    h1 Welcome to {{user.name.toUpperCase()}} page
    div(v-if='liveStreams.length')
      h2 Live Stream
      div(v-for='stream in liveStreams')
        p {{stream}}
        button(@click='joinStream(stream)') Join Stream

    button(@click='goLive') Go Live
    div(v-if='isLive')
        h3 Live Stream

    .messages
      .message(v-for="message in liveStreamMessages")
        p
          span {{message.author}}:&nbsp;
          span {{message.body}}
    form(@submit='sendMessage')
      input(type='text' v-model='message')
      input(type='submit' value= 'Send message')
</template>

<style lang="scss" scoped></style>
