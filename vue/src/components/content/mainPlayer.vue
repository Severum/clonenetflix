<template>
  <div id="mainPlayer" :class="$style.mainPlayer">
    <div :class="[ display ? $style.displaybackarrow : '', $style.backarrow]" v-on:mouseenter="overControler" v-on:mouseleave="leaveControler" v-on:click="cleanPlayer">
      <img src="public/left-arrow.svg" :class="$style.svgbackarrow"/>
    </div>
    <video :src="'video/'+chosenFilm.src+'?token='+token" controls autoplay :class="$style.mainVideo" v-on:mousemove="isMoving()"></video>
  </div>
</template>

<script>
export default {
  name: 'mainPlayer',
  computed: {
    token () {
      return this.$store.state.token
    },
    chosenFilm () {
      return this.$store.state.chosenFilm
    }
  },
  data: () => {
    return {
      display: false,
      displayTimout: null
    }
  },
  mounted: function() {
    document.getElementById('mainPlayer').style.opacity = 1
  },
  methods: {
    // dosen't work well...
    overControler: function() {
      this.display = true
      this.displayTimout = null
    },
    leaveControler: function() {
      this.displayTimout = setTimeout(() => {
        this.display = false
        this.displayTimout = null
      }, 3000)
    },
    cleanPlayer: function() {
      document.getElementById('mainPlayer').style.opacity = 0
      setTimeout(() => {
        this.$store.commit('setChosenFilm', null)
      }, 700)
    },
    isMoving: function() {
      this.display = true
      this.displayTimout = setTimeout(() => {
        this.display = false
        this.displayTimout = null
      }, 3000)
    }
  }
}
</script>

<style module>
.mainPlayer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  background-color: black;
  opacity: 0;
  transition: all 0.7s ease;
}
.mainVideo {
  height: 100vh;
  width: 100vw;
}
.backarrow {
  position: absolute;
  z-index: 10001;
  top: 3vh;
  left: 3vw;
  width: 3vw;
  height: 3vh;
  opacity: 0;
  transition: all 0.2s ease;
}
.displaybackarrow {
  cursor: pointer;
  opacity: 1;
}
.svgbackarrow {
  /* color -> #ffffff; */
  filter: invert(100%) sepia(3%) saturate(13%) hue-rotate(81deg) brightness(106%) contrast(106%);
}
</style>
