import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
// ajouter index.html a ./dist lors de 'npm run build'
require('file-loader?name=[name].[ext]!../index.html')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    chosenFilm: null,
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setChosenFilm (state, film) {
      state.chosenFilm = film
    }
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getChosenFilm: state => {
      return state.chosenFilm
    }
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
