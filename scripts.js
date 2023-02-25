/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","#new":""}
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

const bookmarks = [{"id":"Qeitp7A3pl4697Km","label":"reddit","bookmarks":[{"id":"HYLATC4JLOZzHjNk","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"3phMibFW40AvscPh","label":"r/linux","url":"https://www.reddit.com/r/linux/"}]},{"id":"xv8BBCKIw8xatAPh","label":"japanese","bookmarks":[{"id":"amBUILvyF5IlYUP0","label":"theway","url":"https://https://learnjapanese.moe/"},{"id":"7Q74pZG236IEfajh","label":"ankicard","url":"https://animecards.site/"},{"id":"rBYpkqQPkTlHJpXs","label":"resources","url":"https://kuzuri.neocities.org/resources"}]},{"id":"aR9ClFEguFjd7eMk","label":"anime","bookmarks":[{"id":"lj85PqEpbVX5idWY","label":"nyaa","url":"https://nyaa.si/"},{"id":"6EZRadlc4p5lmeee","label":"asstosrt","url":"https://sorz.github.io/asstosrt-wasm/"}]},{"id":"wiPNhoaQZykEa22M","label":"misc","bookmarks":[{"id":"BFDRQMoNYgpS7Qmv","label":"activitywatch","url":"http://localhost:5600/#/home"},{"id":"LdfpSupMVus1ssqJ","label":"youtube","url":"https://www.youtube.com/"},{"id":"tqDGZ3VyWVqCY7ci","label":"github","url":"https://github.com/"}]}]

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
