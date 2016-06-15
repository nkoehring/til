import cfg from './config'
import github from './github'

const store = {
  state: {
    loaded: false,
    error: false,
    items: []
  }
}


function update() {

  if (!cfg.profile) {
    console.log("no profile loaded…")
    return
  }

  const path = 'GithubAPI/get-rendered-files.md'
  const parts = path.split("/")

  github.renderedContent(path).then(content => {

    const username = "not yet known"
    const category = parts.length === 2 ? parts[0] : "uncategorised"
    const title = parts.length === 2 ? parts[1] : parts[0]

    store.state.items.push({ username, category, title, content })
    store.state.loaded = true
    store.state.error = false

  }).catch( response => {

    console.error("could not load", response.url, response.statusText)
    store.state.loaded = true
    store.state.error = true

  })

}

update()

export default store
