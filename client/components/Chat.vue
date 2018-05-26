<template>
  <ul class='messages' ref='messages'>
    <li v-for='(message, index) in messages' :key="index">
      <b-tag type='is-info'>
        {{ message.username }}
      </b-tag>
      <b-tag>
        {{ message.text }}
      </b-tag>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'chat',
  sockets: {
    msg (message) {
      this.messages.push(message)
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    }
  },
  data () {
    return { messages: [] }
  }
}
</script>
<style>
.messages {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  padding: 8px;
  max-height: 60vh;
  justify-content: flex-end;
  flex-direction: column;
  overflow: scroll;
}
.messages li {
  margin: 3px;
  align-self: flex-end;
  animation: dance 0.8s forwards
}
.messages .tag {
  height: auto;
  white-space: normal;
}
@keyframes dance {
  50% { transform: skew(-7deg) }
}
</style>
