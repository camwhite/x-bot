<template>
  <transition-group name="list-complete" tag="ul" class='messages' ref='messages'>
    <li v-for='(message, index) in messages' :key="index">
      <b-tag type='is-info'>
        {{ message.username }}
      </b-tag>
      <b-tag>
        {{ message.text }}
      </b-tag>
    </li>
  </transition-group>
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
  top: 0;
  right: 0;
  display: flex;
  max-height: 60vh;
  justify-content: flex-end;
  flex-direction: column;
  overflow: scroll;
}
.messages li {
  width: 25vw;
  margin: 3px;
  align-self: flex-end;
}
.messages .tag {
  height: auto;
  white-space: normal;
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
