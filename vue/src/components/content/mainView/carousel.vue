<template>
  <div id="carousel" :class="$style.carousel">
    <div :class="$style.arrow" v-on:click="previous()"></div>
    <div :id="'carouselitems'+url" :class="$style.carouselitems">
      <filmItem v-for="film in films" v-bind:film="film" :key="film._id"/>
      <div :class="$style.stub"></div>
    </div>
    <div :class="[$style.arrow, $style.arrowright]" v-on:click="next()"></div>
  </div>
</template>

<script>
  import filmItem from './carousel/filmItem.vue'

  export default {
    name: 'carousel',
    props: {
      url: String
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    components: {
      filmItem,
    },
    data: () => {
      return {
        films: []
      }
    },
    async created() {
      try {
        let response = await fetch(`http://localhost:3000/${this.url}?token=${this.token}`)
        if (!response.ok) {
          throw new Error(`fetch http error: ${response.status}`)
        } 
        this.films = await response.json()
      } catch(err) {
        console.log("fetch error: "+err.message)
        throw err
      }
    },
    mounted: () => {
    },
    methods: {
      next: function() {
        document.getElementById('carouselitems'+this.url).style.setProperty("left", "-90vw")
      },
      previous: function() {
        document.getElementById('carouselitems'+this.url).style.setProperty("left", "0")
      }
    }
  }
</script>

<style module>
.carousel {
  position: relative;
}
.arrow {
  position: absolute;
  top: 0;
  left: 0;
  width: 5vw;
  height: 100%;
  z-index: 2;
  background-color: rgb(20, 20, 20, 0.3);
  transition: background-color 0.3s ease;
}
.arrow:hover {
  background-color: rgb(20, 20, 20, 0.7);
}
.arrowright {
  left: 95vw;
}
.carouselitems {
  margin-left: 5vw;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: stretch;
  align-content: stretch;
  transition: all 0.7s ease;
}
.stub {
  height: 20.2vw;
  width: 5vw;
}
</style>
