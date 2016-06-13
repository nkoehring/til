function getUser() {

  const hostname = window.location.hostname
  const match = hostname.match(/(.+)\.learned\.today/)

  return match ? match[1] : false

}


const store = {
  apiRoot: "https://api.github.com/repos",

  state: {
    loaded: false,
    error: false,
    username: "nobody",
    mainItem: {
      category: "uncategorised",
      title: "untitled",
      content: "empty"
    },
    items: []
  },

  update: () => {
    const username = getUser()

    if ( ! username ) {
      return
    }

    store.state.username = username

    const xhr = new XMLHttpRequest()
    const path = 'JavaScript/vuejs.md'
    xhr.open('GET', `${store.apiRoot}/${store.state.username}/todayIlearned/contents/${path}`)

    xhr.onload = () => {

      if (xhr.status > 299) {
        console.error("could not load", xhr.responseURL, xhr.statusText)
        store.state.loaded = true
        store.state.error = true
        return
      }

      const parts = path.split("/")

      const content = atob(JSON.parse(xhr.responseText).content)
      const category = parts.length === 2 ? parts[0] : "uncategorised"
      const title = parts.length === 2 ? parts[1] : parts[0]

      store.state.mainItem.category = category
      store.state.mainItem.title = title
      store.state.mainItem.content = content

      store.state.loaded = true
      store.state.error = false
    };

    xhr.send();
  }
}

store.update()

export default store
