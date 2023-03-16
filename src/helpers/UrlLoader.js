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

  /**
   * Creates an instance of UrlLoader.
   * @param {string} fileName - The name of the file to load the URLs from.
   * @memberof UrlLoader
   */
  constructor(fileName) {
    this.#fileName = fileName
  }

  /**
   * Loads the URLs from the file and assigns them to the #urls property.
   * @method
   * @throws {Error} If the file is empty.
   * @memberof UrlLoader
   */
  loadUrls() {
    const fileContent = fs.readFileSync(this.#fileName, 'utf-8')
    const urls = fileContent.replace(/(?:\s*(?:\#.*\n)?)+/, '')
    this.#urls = urls.split('\n').map((url) => url.trim())

    if (this.#urls.length === 0) {
      throw new Error('The file is empty.')
    }
  }

  /**
   * Gets the number of URLs loaded from the file.
   * @method
   * @throws {Error} If no URLs have been loaded.
   * @returns {number} The number of URLs loaded.
   * @memberof UrlLoader
   */
  getUrlsCount() {
    this.validateUrlsLoaded()
    return this.#urls.length
  }

  /**
   * Gets the array of URLs loaded from the file.
   * @method
   * @throws {Error} If no URLs have been loaded.
   * @return {string[]} The array of URLs loaded from the file.
   * @memberof UrlLoader
   */
  getUrlsArray() {
    this.validateUrlsLoaded()
    return this.#urls
  }

  /**
   * Adds a URL to the array of URLs.
   * @method
   * @throws {Error} If the URL is not a string or is empty.
   * @param {string} url - The URL to add to the array of URLs.
   * @memberof UrlLoader
   */
  addUrl(url) {
    this.validateUrlsLoaded()
    if (typeof url !== 'string' || url.trim() === '') {
      throw new Error('URL must be a string and cannot be empty.')
    }
    this.#urls.push(url.trim())
  }

  /**
   * Removes a URL from the array of URLs.
   * @method
   * @throws {Error} If the index is not a number or is not between 0 and the number of URLs.
   * @param {string} index - The index of the URL to remove from the array of URLs.
   * @memberof UrlLoader
   */
  removeUrl(index) {
    this.validateUrlsLoaded()
    if (typeof index !== 'number' || index < 0 || index > this.#urls.length) {
      throw new Error(
        'Index must be a number and must be between 0 and the number of URLs.'
      )
    }
    this.#urls.splice(index, 1)
  }

  /**
   * Gets the name of the file that the URLs are loaded from.
   * @method
   * @return {string} The name of the file that the URLs are loaded from.
   * @memberof UrlLoader
   */
  getFileName() {
    const fileName = this.#fileName.split('/')
    return fileName[fileName.length - 1]
  }

  /**
   * Sets the name of the file that the URLs are loaded from.
   * @method
   * @param {string} fileName - The name of the file that the URLs are loaded from.
   * @memberof UrlLoader
   */
  setFileName(fileName) {
    this.#fileName = fileName
  }

  /**
   * Validates that the #urls property is not empty.
   * @method
   * @throws {Error} If the #urls property is empty.
   * @memberof UrlLoader
   */
  validateUrlsLoaded() {
    if (!this.#urls) {
      throw new Error('No URLs loaded.')
    }
  }
}

export default UrlLoader
