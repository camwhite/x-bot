<template>
  <div v-show="isPlaying" class="player-container">
    <div class="player" ref="player"></div>
    <marquee direction="left" speed="normal" behavior="loop">
      <b-tag v-for="(track, index) in queue" :key="index"
        v-if="index === currentIndex || index === currentIndex + 1">
        {{ currentIndex === index ? 'Now Playing: ' : '' }}
        {{ currentIndex + 1 === index ? 'Up Next: ' : '' }}
        {{ track.title }}
      </b-tag>
    </marquee>
  </div>
</template>
<script>
import YoutubePlayer from 'youtube-player'

export default {
  name: 'youtube',
  sockets: {
    youtube (video) {
      this.queue.push(video)
      if (!this.isPlaying) {
        this.play(video)
      }
      this.$toast.open({
        message: `Video added to queue: ${video.title}`,
        duration: 1000
      })
    },
    next () {
      this.next()
    }
  },
  data () {
    return {
      queue: [],
      currentIndex: 0,
      isPlaying: false
    }
  },
  mounted () {
    this.player = YoutubePlayer(this.$refs.player)
    this.player.on('stateChange', ({ data }) => data === 0 ? this.next() : null)
  },
  methods: {
    play (video) {
      this.player.loadVideoById(video.id)
      this.player.playVideo()
        .then(() => this.isPlaying = true)

    },
    next () {
      this.currentIndex++
      const video = this.queue[this.currentIndex]
      if (video) {
        this.play(video)
      } else {
        this.currentIndex = 0
        this.queue = []

        this.player.stopVideo()
          .then(() => this.isPlaying = false)
      }
    }
  }
}
</script>
<style>
.player-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 352px;
  height: 177px;
}
.player {
  width: 100%;
  height: 100%;
}
marquee .tag {
  margin: 0 8px;
}
</style>
