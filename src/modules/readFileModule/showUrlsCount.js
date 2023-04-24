import UrlLoader from '../../helpers/UrlLoader.js'

function showUrlsCount(file) {
  const urlLoader = new UrlLoader(file)

  urlLoader.loadUrls()

  const urlsCount = urlLoader.getUrlsCount()
  console.info(`The file contains ${urlsCount} URLs`)
}

export default showUrlsCount
