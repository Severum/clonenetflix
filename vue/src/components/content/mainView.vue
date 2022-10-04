<template>
  <div id="mainView" :class="$style.mainView">
    <h2 :class="$style.title">Films</h2>
    <carousel url="films"/>
    <h2 :class="$style.title">Films par année</h2>
    <carousel url="filmsbydate"/>
    <h2 :class="$style.title">Films ordre alphabétique</h2>
    <carousel url="filmsbyabc"/>
  </div>
</template>

<script>
  import carousel from './mainView/carousel.vue'

  export default {
    name: 'mainView',
    components: {
      carousel,
    },
    data: () => {
      return {
      }
    },
    beforeCreate: () => {
    },
    created: () => {
    },
    mounted: () => {
    }
  }
</script>

<style module>
.mainView {
  margin-top: 70px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
}
.title {
  margin-left: 5vw;
  color: #e5e5e5;
}
</style>
