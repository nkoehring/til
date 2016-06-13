<template>
  <div id="main-item">
    <h1>Today, {{* name }} learned:</h1>
    <ol>
      <li>
        <em>{{ title }} in {{ category }}</em>
        <p>{{ content }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import store from '../store'

export default {
  data () {
    return store.state.mainItem
  }
}
</script>
