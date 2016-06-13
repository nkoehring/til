<template>
  <div id="app">
    <hello v-if="!loaded"></hello>
    <load-error v-if="loaded && error"></load-error>
    <main-item v-if="loaded && !error"></main-item>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import MainItem from './components/MainItem.vue'
import store from './store'

export default {
  components: { Hello, MainItem },
  data () {
    return { loaded: store.state.loaded, error: store.state.error }
  }
}
</script>

<style>
  body {
    background: #EEE;
    color: #444;
    font-family: Helvetica, sans-serif;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    width: 960px;
    margin: 5em auto;
    padding: 1em 2em;
    background: #DDD;
  }

  h1 {
    margin: 0;
  }

  #main-item {
    border: 2px solid #444;
    padding: 1em 2em;
    background: #EEE;
  }
</style>
