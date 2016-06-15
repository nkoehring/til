const subdomainMatch = window.location.hostname.match(/(.+)\.learned\.today/)
const profile = subdomainMatch ? subdomainMatch[1] : ""
const apiRoot = "https://api.github.com/repos"
const apiVersion = "v3"
const defaultRepo = "til"

export default { apiRoot, apiVersion, profile, defaultRepo }
