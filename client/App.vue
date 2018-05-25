<template>
  <div>
    <chat></chat>
    <presence></presence>
    <rickroll></rickroll>
    <youtube></youtube>
  </div>
</template>
<script>
import Chat from './components/Chat';
import Presence from './components/Presence';
import Rickroll from './components/Rickroll';
import Youtube from './components/Youtube';

export default {
  name: 'App',
  components: { Chat, Presence, Rickroll, Youtube },
  sockets: {
    connect () {
      this.$toast.open('connected')
    },
    disconnect () {
      this.$toast.open('disconnected')
    }
  },
  data () {
    return {
      connected: false
    }
  }
}
</script>
<style>
body {
  position: relative;
  height: 100vh;
  background: #00ff00;
}
</style>
