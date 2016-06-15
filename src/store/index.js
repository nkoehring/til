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

  loadItem(path).then(item => {

    store.state.items.push(item)
    store.state.loaded = true
    store.state.error = false

  }).catch( () => {

    store.state.loaded = true
    store.state.error = true

  })

}


/**
  * load data for a single file and add it to items list
  *
  * @param {path} String path to file
  * @return {Promise} that resolves to { author, category, title, content }
  */

function loadItem(path) {

  const parts = path.split("/")
  const item = {
    category: parts.length === 2 ? parts[0] : "uncategorised",
    title: parts.length === 2 ? parts[1] : parts[0]
  }

  const pContrib = github.contributors(path)
  const pContent = github.renderedContent(path)

  return Promise.all([pContrib, pContent]).then(data => {

    item.contributors = data[0]
    item.content = data[1]

    return item

  }).catch( data => {

    console.error(`Fetching of ${path} failed`)

  })

}

update()

export default store
