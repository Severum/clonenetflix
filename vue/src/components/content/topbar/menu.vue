<template>
  <div id="topbarMenu" :class="$style.menustyle">
      <ul>
          <li>Accueil</li>
          <li>Films</li>
          <!-- <li>Séries</li> -->
      </ul>
  </div>
</template>

<script>

export default {
  name: 'topbarMenu',
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
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline;
  cursor: pointer;
  margin-left: 1rem;
  color: #e5e5e5;
  /* #808080; */
}
.menustyle {
  flex: 1 1 auto;
  align-self: center;
}
</style>
