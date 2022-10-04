<template>
  <div id="app">
    <login v-if="!token"/>
    <mainContent v-else/>
  </div>
</template>

<script>
  import login from './components/login.vue'
  import mainContent from './components/mainContent.vue'

  export default {
    name: 'app',
    components: {
      mainContent,
      login,
    },
    computed: {
      token () {
        return this.$store.state.token
      }
    },
    data: () => {
      return {
        tokenTimeout: null
      }
    },
    created() {
    },
    mounted() {
    },
    updated() {
      if (this.token != null) {
        if (this.tokenTimeout == null) {
          this.tokenTimeout = setInterval(async () => {
            try {
              let res = await fetch(`http://localhost:3000/getNewToken?token=${this.token}`)
              if (res.ok) {
                this.$store.commit('setToken', await res.text())
              } else {
                clearInterval(this.tokenTimeout)
                this.tokenTimeout = null
                this.$store.commit('setToken', null)
              }
            } catch (ex) {
              clearInterval(this.tokenTimeout)
              this.tokenTimeout = null
              console.log("fetch error: "+ex.message)
            }
          }, 300000) // 5 m  in
          // }, 15000) // 15 sec
        }
      }
      if (this.token == null) {
        if (this.tokenTimeout != null) {
          clearInterval(this.tokenTimeout)
          this.tokenTimeout = null
        }
      }
    },
    methods: {
    }
  }
</script>

<style module>
  /* const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) */
  /* color: #808080; */
  /* color: #e5e5e5;  */
  /* #141414  background*/
@font-face {
  font-family: "sansita";
  src: local("sansita"),
    url(../public/fonts/SansitaOne.ttf) format("truetype");
}
body {
  font-family: "sansita";
  margin: 0;
  padding: 0;
  background:#141414;
  overflow-x: hidden;
}
</style>
