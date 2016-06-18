<template>
  <div id="app">
    <hello v-if="!state.loaded"></hello>
    <load-error v-if="state.loaded && state.error"></load-error>
    <main-item v-if="state.loaded && !state.error"></main-item>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import MainItem from './components/MainItem.vue'
import LoadError from './components/LoadError.vue'
import store from './store'
// import config from './store'

export default {
  components: { Hello, MainItem, LoadError },
  data () {
    return { state: store.state }
  }
}
</script>

<style>

  ::-webkit-scrollbar {
    max-width: 10px;
    max-height: 10px;
    background: #222;
  }
  ::-webkit-scrollbar-corner,
  ::-webkit-scrollbar-track {
    background: #222;
  }

  ::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 5px;
  }

  body {
    background: #222 url(bg.png) fixed left top;
    color: #EEE;
    font-family: Helvetica, sans-serif;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 960px;
    margin: 1em auto;
    padding: 1em 2em;
  }

  a {
    color: #48C;
    text-decoration: none;
  }

</style>
