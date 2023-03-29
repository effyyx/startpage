/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"TBnYqxYQCuIZASP4","label":"reddit","bookmarks":[{"id":"dZQ6D9jAiFGmtXLl","label":"r/linuxgaming","url":"https://www.reddit.com/r/linux_gaming/"},{"id":"u3ZVAQwspGs0wkem","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"M6M1P7FwYI3SrRVA","label":"r/linux","url":"https://www.reddit.com/r/linux/"}]},{"id":"ePCU0v7GhAbLYHNH","label":"japanese","bookmarks":[{"id":"Q6vQfhHHGgaPcdQ9","label":"resources","url":"https://kuzuri.neocities.org/resources"},{"id":"vd1KBq5il0pMeSHj","label":"ankicard","url":"https://animecards.site/"},{"id":"IH4dAv0nTYrRlmqW","label":"theway","url":"https://learnjapanese.moe/"},{"id":"BOEImaTKAfIazbtA","label":"nyaa","url":"https://nyaa.iss.ink/"}]},{"id":"HdsVvewQVP1qEdN3","label":"media","bookmarks":[{"id":"PqlvMbtPrsCx2WKc","label":"youtube","url":"https://www.youtube.com/"},{"id":"ZRpnxq4Cj9BIColZ","label":"jellyfin","url":"http://127.0.0.10:8096/"}]},{"id":"sEjzjp36PeIQirBf","label":"misc","bookmarks":[{"id":"nfUYpkeLuuHlVru1","label":"activitywatch","url":"http://localhost:5600/#/home"},{"id":"92oqrmajB9Ktv75M","label":"github","url":"https://github.com/"},{"id":"Dw0PodZpfHcQHw7p","label":"komga","url":"http://localhost:8080/welcome"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
