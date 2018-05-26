
<template>
  <canvas ref="wall"></canvas>
</template>
<script>
export default {
  name: 'spraypaint',
  sockets: {
    tag (content) {
      const style = this.generateRandomHex()
      const { posX } = this.generateRandomPos()
      this.drawText(content.split(''), style, posX)
    }
  },
  beforeCreate () {
    // text drawing constants
    this.dashLen = 220
    this.speed = 5 * 3
    this.dickRegex = /^8(=*)D$/gi
  },
  create () {
    this.drawText = this.drawText.bind(this)
  },
  mounted () {
    const canvas = this.$refs.wall
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.cwidth = canvas.width
    this.cheight = canvas.height

    this.ctx = canvas.getContext('2d')
    this.ctx.font = '111px A Dripping Marker'
    this.ctx.lineJoin = "round"; 
    this.ctx.baseline = 'top'
    this.ctx.textAlign = 'center'
    this.ctx.lineWidth = 6
  },
  methods: {
    generateRandomHex () {
      const fill = Math.random().toString(16).substr(-6)
      const stroke = Math.random().toString(16).substr(-6)

      return { fill, stroke }
    },
    generateRandomPos () {
      const threshold = 80
      const posX = Math.floor(Math.random() * ((this.cwidth - threshold) - threshold)) + threshold
      const posY = Math.floor(Math.random() * ((this.cheight - threshold) - threshold)) + threshold

      return { posX, posY }
    },
    drawText (chars, style, x, index = 0, offset = this.dashLen) {
      //console.log(`chars: ${chars}`, `index: ${index}`, `offset: ${offset}`, `x: ${x}`)
      if(!chars[index]) {
        return setTimeout(() => this.ctx.clearRect(0, 0, this.cwidth, this.cheight), 5000)
      }

      this.ctx.fillStyle = `#${style.fill}`
      this.ctx.strokeStyle = `#${style.stroke}`
      this.ctx.setLineDash([this.dashLen - offset, offset - this.speed]); // create a long dash mask
      this.ctx.strokeText(chars[index], x, 90);                               // stroke letter

      offset -= this.speed;                                         // reduce dash length

      if(offset > 0) {
        requestAnimationFrame(() => this.drawText(chars, style, x, index, offset))
      } else  {
        this.ctx.fillText(chars[index], x, 90);                               // stroke letter

        index++
        x += this.ctx.measureText(chars[index]).width + this.ctx.lineWidth * Math.random();

        this.ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
        this.ctx.rotate(Math.random() * 0.005);                         // random rotation
        offset = this.dashLen;                                      // prep next char
        requestAnimationFrame(() => this.drawText(chars, style, x, index, offset))
      }
    }
  }
}
</script>
<style>
@font-face {
  font-family: 'A Dripping Marker';
  src: url('/assets/adrip.ttf');
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
