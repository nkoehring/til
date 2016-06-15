import cfg from './config'
import { Promise } from 'es6-promise'


const acceptType = {
  html: `application/vnd.github.${cfg.apiVersion}.html`,
  json: `application/vnd.github.${cfg.apiVersion}.json`,
  raw: `application/vnd.github.${cfg.apiVersion}.raw`
}


/**
  * return promised XMLHTTPRequest (we only need GET)
  *
  * @param {url} String URL to load
  * @param {header} Object optional headers to send, defaults to {}
  * @return {Promise}
  */

function get(url, header={}) {

  const req = new XMLHttpRequest()
  req.open('GET', url)

  // set request headers if applicable
  Object.keys(header).forEach( k => { req.setRequestHeader(k, header[k]) })

  const promise = new Promise( (resolve, reject) => {
    req.onerror = reject
    req.onabort = reject

    req.onload = (evt) => {
      const req = evt.target
      const response = {
        status: req.status,
        statusText: req.statusText,
        response: req.response,
        text: req.responseText,
        url: req.responseURL
      }

      if (req.status >= 300) {
        reject(response)
      } else {
        resolve(response)
      }
    }
  })

  req.send()
  return promise

}


/**
  * Fetch json encoded data for file path
  *
  * @param {url} String path to file
  * @return {Promise}
  */

function json(url) {

  const promise = get(url, {Accept: acceptType.json})

  return promise.then( response => {
    return JSON.parse(response.text)
  })

}


/**
  * Fetch raw data for file path
  *
  * @param {path} String path to file
  * @return {Promise}
  */

function rawContent(path) {

  const url = `${cfg.apiRoot}/${cfg.profile}/${cfg.defaultRepo}/contents/${path}`

  return json(url).then( obj => {
    return atob(obj.content)
  })

}


/**
  * Fetch rendered data for file path
  *
  * @param {path} String path to file
  * @return {Promise}
  */

function renderedContent(path) {

  const url = `${cfg.apiRoot}/${cfg.profile}/${cfg.defaultRepo}/contents/${path}`
  const promise = get(url, {Accept: acceptType.html})

  return promise.then( response => {
    return response.text
  })
}


/**
  * Fetch commit data for file path
  *
  * @param {path} String path to file
  * @return {Promise}
  */

function commitData(path) {
  const url = `${cfg.apiRoot}/${cfg.profile}/${cfg.defaultRepo}/commits?path=${path}`
  return json(url)
}


/**
  * Fetch commit data and map contributors
  *
  * @param {path} String path to file
  * @return {Promise}
  */

function contributors(path) {

  //TODO: think about caching of commit (and other json) data
  return commitData(path).then(list => {
    return list.map(entry => {
      return {
        name: entry.commit.author.name,
        avatar: entry.author.avatar_url,
        url: entry.author.html_url,
        date: entry.commit.author.date,
        message: entry.commit.message
      }
    })
  })

}


export default {
  json,
  rawContent,
  renderedContent,
  commitData,
  acceptType,
  contributors
}
