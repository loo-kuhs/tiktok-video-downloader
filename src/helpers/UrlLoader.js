import fs from 'fs'

/**
 * Class for loading and manipulating URLs from a file.
 * @class UrlLoader
 * @property {string} #fileName - The name of the file to load the URLs from.
 * @property {string[]} #urls - The array of URLs.
 *
 * @author loo-kuhs
 */
class UrlLoader {
  #urls
  #fileName

  constructor(fileName) {
    this.#fileName = fileName
  }

  loadUrls() {
    const fileContent = fs.readFileSync(this.#fileName, 'utf-8')
    const urls = fileContent.replace(/(?:\s*(?:\#.*\n)?)+/, '')
    this.#urls = urls.split('\n').map((url) => url.trim())

    if (this.#urls.length === 0) {
      throw new Error('The file is empty.')
    }
  }

  getUrlsCount() {
    this.validateUrlsLoaded()
    return this.#urls.length
  }

  getUrlsArray() {
    this.validateUrlsLoaded()
    return this.#urls
  }

  addUrl(url) {
    this.validateUrlsLoaded()
    if (typeof url !== 'string' || url.trim() === '') {
      throw new Error('URL must be a string and cannot be empty.')
    }
    this.#urls.push(url.trim())
  }

  removeUrl(index) {
    this.validateUrlsLoaded()
    if (typeof index !== 'number' || index < 0 || index > this.#urls.length) {
      throw new Error(
        'Index must be a number and must be between 0 and the number of URLs.'
      )
    }
    this.#urls.splice(index, 1)
  }

  getFileName() {
    const fileName = this.#fileName.split('/')
    return fileName[fileName.length - 1]
  }

  setFileName(fileName) {
    this.#fileName = fileName
  }

  validateUrlsLoaded() {
    if (!this.#urls) {
      throw new Error('No URLs loaded.')
    }
  }
}

export default UrlLoader
