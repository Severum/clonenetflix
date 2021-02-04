<template>
  <div id="topbar" :class="$style.topbar">
    <!-- left -->
    <div :class="$style.topbarleft">
      <img src="public/netflix-logo.png" :class="$style.logo">
      <topbarMenu/>
    </div>
    <!-- right -->
    <div :class="$style.topbarright">
      <profil :class="$style.profil"/>
      <searchbar/>
    </div>
  </div>
</template>

<script>
  import topbarMenu from './topbar/menu.vue'
  import searchbar from './topbar/searchbar.vue'
  import profil from './topbar/profil.vue'

  export default {
    name: 'topbar',
    components: {
      topbarMenu,
      searchbar,
      profil,
    },
    data: () => {
      return {
      }
    },
    created: () => {
    },
    mounted: () => {
    }
  }
</script>

<style module>
.topbar {
  display: flex;
  justify-content: space-between;
  top: 0px;
  position: fixed;
  z-index: 1000;
  height: 70px;
  width: 100%;
  background-image: linear-gradient(black, #141414);
}
.topbarleft {
  margin-left: 5vw;
  display: flex;
  flex: 1;
}
.logo {
  align-self: center;
  height: 40px;
  width: auto;
}
.topbarright {
  margin-right: 5vw;
  display: flex;
  flex: 1 0 0;
  flex-direction: row-reverse;
}
.profil {
  padding-left: 10px;
  flex: 0 0 50px;
  align-self: center;
}
</style>
