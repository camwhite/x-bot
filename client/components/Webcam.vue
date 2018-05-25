
<template>
  <video playsinline autoplay muted ref="webcam"></video>
</template>
<script>
import { init } from '../services'
export default {
  name: 'webcam',
  mounted () {
    init(this.$refs.webcam)
  }
}
</script>
<style>
video {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 352px;
  height: 288px;
}
</style>
