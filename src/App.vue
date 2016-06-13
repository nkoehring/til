<template>
  <h1 id="disclaimer">this application is just a working draft</h1>
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
import config from './store'

export default {
  components: { Hello, MainItem, LoadError },
  data () {
    return { state: store.state }
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

  #disclaimer {
    display: block;
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 3rem;
    color: #888;
  }
  #disclaimer::before {
    content: "disclaimer";
    position: absolute;
    top: -2rem;
    left: -1rem;
    text-align: left;
    font-size: 6rem;
    color: #CCC;
    z-index: -1;
  }
</style>
