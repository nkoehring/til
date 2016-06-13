import cfg from './config'

const store = {
  state: {
    loaded: false,
    error: false,
    items: []
  }
}


function update() {

  if (!cfg.profile) {
    console.log("no username…")
    return
  }

  const xhr = new XMLHttpRequest()
  const path = 'GithubAPI/get-rendered-files.md'
  xhr.open('GET', `${cfg.apiRoot}/${cfg.profile}/todayIlearned/contents/${path}`)
  
  // nice direct way to get a rendered markdown file
  xhr.setRequestHeader("Accept", `application/vnd.github.${cfg.apiVersion}.html`)

  xhr.onload = () => {

    if (xhr.status > 299) {
      console.error("could not load", xhr.responseURL, xhr.statusText)
      store.state.loaded = true
      store.state.error = true
      return
    }

    const parts = path.split("/")

    const username = "not yet known"
    const content = xhr.responseText
    const category = parts.length === 2 ? parts[0] : "uncategorised"
    const title = parts.length === 2 ? parts[1] : parts[0]

    let newItem = { username, category, title, content }
    store.state.items.push(newItem)

    store.state.loaded = true
    store.state.error = false
  };

  xhr.send();
}

update()

export default store
