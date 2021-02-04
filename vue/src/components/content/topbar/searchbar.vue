<template>
  <div id="searchbar" :class="[ toggle ? $style.searchbarToggle : '', $style.searchbar ]">
    <img v-show="!toggle" src="public/loupe.svg" :class="$style.svgloupe" v-on:click="toggle = !toggle"/>
    <span v-show="toggle" :class="$style.toggleOn">
      <img src="public/loupe.svg" :class="[ $style.svgloupeOn, $style.svgloupe ]" v-on:click="toggle = !toggle"/>
      <input type="text" :class="[ toggle ? $style.inputstyleToggle : '', $style.inputstyle ]" placeholder="Titres, personnes, genres">
    </span>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  data: () => {
    return {
      toggle: false,
    }
  },
  created: () => {
  },
  mounted: () => {
  }
}
</script>

<style module scoped>
.searchbar {
  flex: 0 0 auto;
  height: 30px; 
  align-self: center;
  width: 30px;
  transition: width 0.5s ease;
}
.searchbarToggle {
  width: 250px;
  border: 1px solid white;
}
.svgloupe {
  cursor: pointer;
  height: 20px;
  width: auto;
  /* color -> #ffffff; */
  filter: invert(100%) sepia(3%) saturate(13%) hue-rotate(81deg) brightness(106%) contrast(106%);
}
.toggleOn {
  display: flex;
}
.svgloupeOn {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.inputstyle {
  background: transparent;
  border: none;
  outline: 0;
  font-family: inherit;
  color: #c3c3c3;
  width: 100%;
}
.inputstyle::placeholder {
  color: #c3c3c3;
  opacity: 0;
  transition: opacity 1s ease;
}
.inputstyle::-moz-placeholder {
  color: #c3c3c3;
  opacity: 0;
  transition: opacity 1s ease;
}
.inputstyleToggle::placeholder {
  opacity: 1;
}
.inputstyleToggle::-moz-placeholder {
	opacity: 1;
}
</style>
