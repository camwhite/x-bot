<template>
  <div>
    <chat></chat>
    <presence></presence>
    <rickroll></rickroll>
    <youtube></youtube>
    <spraypaint></spraypaint>
  </div>
</template>
<script>
import Chat from './components/Chat';
import Presence from './components/Presence';
import Rickroll from './components/Rickroll';
import Youtube from './components/Youtube';
import Spraypaint from './components/Spraypaint';

export default {
  name: 'App',
  components: { Chat, Presence, Rickroll, Youtube, Spraypaint },
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
marquee {
  width: 100%;
  animation:  caption 50s linear 0s infinite;
  color: white;
  margin-top: -10px;
  padding: 8px 0;
  border: 1px solid #000;
  transition: background-color 350ms;
  overflow: hidden;
  overflow-x:-webkit-marquee;
  -webkit-marquee-direction: right;
  -webkit-marquee-style: scroll;
  -webkit-marquee-speed: normal;
  -webkit-marquee-increment: small;
  -webkit-marquee-repetition: 5;
  overflow-x: marquee-line;
  marquee-direction: forward;
  marquee-style: loop;
  marquee-speed: slow;
  marquee-play-count: 5;
}
</style>
