import UrlLoader from '../../helpers/UrlLoader.js'

/**
 * The function loads URLs from a file and displays the count of URLs present in the file.
 * @method
 * @param file - The parameter "file" is a string that represents the file path or URL from which the
 * URLs need to be loaded and counted.
 */
function showUrlsCount(file) {
  const urlLoader = new UrlLoader(file)

  urlLoader.loadUrls()

  const urlsCount = urlLoader.getUrlsCount()
  console.info(`The file contains ${urlsCount} URLs`)
}

export default showUrlsCount
