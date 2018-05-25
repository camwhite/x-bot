<template>
  <div>
    <img src='assets/rickroll.gif'
         :class="isRolling ? 'roll active' : 'roll'" />
  </div>
</template>
<script>
import { Howl, Howler } from 'howler'

export default {
  name: 'rickroll',
  sockets: {
    roll () {
      if (this.isRolling) return
      const sound = new Howl({
        src: ['/assets/rickroll.wav'],
        onend: () => this.isRolling = false
      })
      sound.play()
      this.isRolling = true
    }
  },
  data () {
    return {
      isRolling: false
    }
  }
}
</script>
<style>
.roll {
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(0);
  transition: all 1s;
  z-index: 1000;
}
.roll.active {
  transform: scale(1);
}
</style>
