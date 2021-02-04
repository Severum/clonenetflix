<template>
  <div id="mainContent">
    <mainPlayer v-if="chosenFilm"/>
    <topbar/>
    <mainView/>
    <appfooter/>
  </div>
</template>

<script>
import mainPlayer from './content/mainPlayer.vue'
import topbar from './content/topbar.vue'
import mainView from './content/mainView.vue'
import appfooter from './footer.vue'

export default {
  name: 'mainContent',
  computed: {
    chosenFilm () {
      return this.$store.state.chosenFilm
    }
  },
  components: {
    mainPlayer,
    topbar,
    mainView,
    appfooter,
  }
}
</script>

<style module>
</style>
