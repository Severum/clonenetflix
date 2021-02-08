<template>
  <div :id="'filmItem '+film.name" :class="$style.filmitem" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave">
    <div :class="[ isHover ? getHoverStyle() : '', $style.filmcard]">
      <img v-show="!isHover" :src="film.thumbnail" :class="$style.thumbnail">
      <div v-if="isHover" :class="$style.detailwrapper">
        <video :src="'video/'+film.src+'?token='+token" autoplay :class="$style.video" v-on:click="playFilm()"></video>
        <div :class="$style.control">
          <div :class="$style.circle" v-on:click="playFilm()">
            <div :class="$style.play">
            </div>
          </div>
        </div>
        <div :class="$style.filmdetails">
          <p>{{ film.name }}</p>
          <p>{{ film.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filmItem',
    props: {
      film: Object
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    data: () => {
      return {
        isHover: false
      }
    },
    created: () => {
    },
    updated: function() {
    },
    methods: {
      mouseOver: function() {
        this.isHover = true
      },
      mouseLeave: function() {
        this.isHover = false
      },
      getHoverStyle: function() {
        // console.log("document.getElementById('filmItem '+this.film.name): "+document.getElementById('filmItem '+this.film.name).offsetLeft)
        // if (document.getElementById('filmItem '+this.film.name).style.left == ) {
        //   return return this.$style.filmcardHoverFirstElem
        // }
        // if (document.getElementById('filmItem '+this.film.name)) {
        //   return return this.$style.filmcardHoverLastElem
        // }
        return this.$style.filmcardHover
      },
      playFilm: function() {
        this.$store.commit('setChosenFilm', this.film)
      }
    }
  }
</script>

<style module>
.filmitem {
  position: relative;
  height: 100%;
  width: 15vw;
  min-width: 15vw;
  overflow: visible;
}
.filmcard {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 20vw;
  width: 15vw;
  background-color: #141414;
  border-radius: 10px;
  transition: all 0.5s ease;
}
.filmcardHover {
  z-index:2;
  top: -2vw;
  left: -2.5vw;
  width: 20vw;
  height: 25vw;
  box-shadow: 5px 5px 5px black;
}
/* .filmcardHoverFirstElem {
  z-index:2;
  top: -2vw;
  width: 20vw;
  height: 25vw;
  box-shadow: 5px 5px 5px black;
}
.filmcardHoverLastElem {
  z-index:2;
  top: -2vw;
  left: -5vw;
  width: 20vw;
  height: 25vw;
  box-shadow: 5px 5px 5px black;
} */
.thumbnail {
  width: 100%;
  height: 100%;
  border: solid 2px;
  border-radius: 10px;
  border-color: #141414;
}
.detailwrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.video {
  cursor: pointer;
  width: 100%;
  height: auto;
}
.control {
  position: relative;
  margin: 0.5vw 0.5vw 0.5vw 0.8vw ;
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  background-color: white;
  width: 2vw;
  height: 2vw;
  cursor: pointer;
}
.play {
  width: 0;
  height: 0;
  border-top: 0.5vw solid transparent;
  border-bottom: 0.5vw solid transparent;
  border-left: 0.8vw solid #141414;
  margin-left: 0.2vw;
}
.filmdetails {
  color: #e5e5e5;
  padding: 0.5rem;
}
</style>
