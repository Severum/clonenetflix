<template>
  <div id="appfooter" :class="$style.appfooter">
    <!-- <div :class="$style.bug">Signaler un bug</div> -->
  </div>
</template>

<script>
export default {
  name: 'appfooter',
  methods: {
  }
}
</script>

<style module>
.appfooter {
  margin-top: -50px;
  height: 50px;
  width: 100%;
  background-image: linear-gradient(#141414, black);
  color:#e5e5e5;
}
/* .bug {
  margin: 0.2rem;
  padding: 0.2rem;
} */
</style>
