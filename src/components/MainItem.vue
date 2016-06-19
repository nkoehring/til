<template>
  <div id="main-item">
    <div class="headlines">
      <h1 class="today">Today</h1>
      <h1 class="name">{{ contributors[0].name }}</h1>
      <h1 class="learned">learned</h1>
    </div>
    <ol>
      <li>
        <em>{{ category }}</em> / <em>{{ title }}</em>
        <p>{{{ content }}}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import store from '../store'

export default {
  data () {
    return store.state.items[0]
  }
}
</script>

<style>


  #main-item > .headlines {
    display: block;
    padding-left: 35%;
  }

  #main-item > .headlines > h1 {
    display: block;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  #main-item > .headlines > h1.today {
    font-size: 5em;
    color: rgba(100, 100, 100, .6);
    margin-left: -.165em;
    margin-bottom: -.6em;
    z-index: 1;
  }

  #main-item > .headlines > h1.name {
    font-size: 5em;
    color: rgba(100, 200, 250, .8);
    margin-bottom: -.6em;
    z-index: 2;
  }

  #main-item > .headlines > h1.learned {
    font-size: 5em;
    color: rgba(100, 100, 100, .6);
    margin-left: -.008em;
    z-index: 1;
  }

  #main-item ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  #main-item article.markdown-body {
    border: 2px solid #444;
    padding: 1em 2em;
    background: #181818;
    border-radius: 3px;
  }

  #main-item article.markdown-body code,
  #main-item article.markdown-body .highlight {
    border-radius: 3px;
    font-size: 85%;
  }

  #main-item em,
  #main-item article.markdown-body code {
    display: inline-block;
    padding: .2em .3em;
    background: #333;
    vertical-align: baseline;
    font-style: normal;
  }

  #main-item article.markdown-body .highlight pre {
    overflow: auto;
    line-height: 1.8em;
    margin: 0;
    padding: .5em 1em;
  }

</style>
