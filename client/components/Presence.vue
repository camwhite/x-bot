<template>
  <section class='presence'>
    <ul class='chatters'>
      <h3>Current Chatters</h3>
      <li v-for='user in presentChatters'>
        <b-tag type='is-primary'>
          {{ user }}
        </b-tag>
      </li>
    </ul>
    <ul class='lurkers'>
      <h3>Current Lurkers</h3>
      <li v-for='user in presentLurkers'>
        <b-tag type='is-danger'>
          {{ user }}
        </b-tag>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'presence',
  sockets: {
    join ({ username }) {
      this.$toast.open({
        message: `Thanks for joining ${username}, now use the chat :D`,
        duration: 3000
      })
      if (!this.presentLurkers.includes(username) && !this.presentChatters.includes(username)) {
        this.presentLurkers.push(username)
      }
    },
    leave ({ username }) {
      let index = this.presentLurkers.indexOf(username) 
      if (index !== -1) {
        this.presentChatters.splice(index, 1)
      } else {
        index = this.presentChatters.indexOf(username)
        this.presentChatters.splice(index, 1)
      }
    },
    msg ({ username }) {
      username = username.toLowerCase()
      if (this.presentLurkers.includes(username)) {
        const index = this.presentLurkers.indexOf(username)
        this.presentLurkers.splice(index, 1)
        this.presentChatters.push(username)
        setTimeout(() => {
          const index = this.presentChatters.indexOf(username)
          this.presentChatters.splice(index, 1)
          this.presentLurkers.push(username)
        }, 50 * 10000)
      } else if (!this.presentChatters.includes(username)) {
        this.presentChatters.push(username)
        setTimeout(() => {
          const index = this.presentChatters.indexOf(username)
          this.presentChatters.splice(index, 1)
          this.presentLurkers.push(username)
        }, 50 * 10000)
      }
    }
  },
  data () {
    return {
      presentLurkers: [],
      presentChatters: []
    }
  }
}
</script>
<style>
.presence {
  position: absolute;
  bottom: 3px;
  left: 3px;
  padding: 8px;
}
.presence h3 {
  padding: 8px;
  background: #333;
  color: white;
  border-radius: 3px;
}
.presence ul {
  margin: 8px 0;
}
</style>
