/**
 * This class takes the URL of the TikTok video and sanitizes it, then it returns the video ID, the username of the user who posted the video, the URL of the TikTok video, and the download URL of the video.
 *
 * @property {string} #url - The URL of the TikTok video.
 * @property {string} #videoID - The video ID of the TikTok video.
 * @property {string} #username - The username of the user who posted the TikTok video.
 * @class TikTokVideoURL
 *
 * @author loo-kuhs
 */
class TikTokVideoURL {
  #url = ''
  #videoID = ''
  #username = ''

  /**
   * Creates an instance of TikTokVideoURL.
   *
   * @constructor
   * @param {string} url - The URL of the TikTok video.
   * @throws {Error} If the URL is invalid.
   * @memberof TikTokVideoURL
   */
  constructor(url) {
    if (!TikTokVideoURL.isValidURL(url)) {
      throw new Error('Invalid URL')
    }
    this.#url = url
  }

  /**
   * It checks if the URL is valid or not.
   *
   * @static
   * @param {string} url - The URL to check.
   * @return {boolean} The return value is a boolean.
   * @memberof TikTokVideoURL
   */
  static isValidURL(url) {
    try {
      new URL(url)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  /**
   * It checks if the URL is a TikTok URL or not.
   *
   * @static
   * @param {string} url - The TikTok video URL to check.
   * @return {boolean} The return value is a boolean.
   * @memberof TikTokVideoURL
   */
  static isTikTokURL(url) {
    const regex = /^https?:\/\/(?:www\.)?tiktok\.com\/@([^\/]+)\/video\/(\d+)/
    return regex.test(url)
  }

  /**
   * It checks if the video ID provided is valid or not.
   *
   * @static
   * @param {string} videoID - The video ID to check.
   * @return {boolean} The return value is a boolean.
   * @memberof TikTokVideoURL
   */
  static isValidVideoID(videoID) {
    const regex = /^\d+$/
    return regex.test(videoID)
  }

  /**
   * It checks if the username provided is valid or not.
   *
   * @static
   * @param {string} username - The username to check.
   * @return {boolean} The return value is a boolean.
   * @memberof TikTokVideoURL
   */
  static isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_.?-]+$/g
    return regex.test(username)
  }

  /**
   * It takes the TikTok URL, splits it into parts, and then returns the last part of the URL which is the video ID.
   *
   * @method
   * @throws {Error} If the URL is invalid.
   * @returns {string} The video ID.
   * @memberof TikTokVideoURL
   */
  getVideoID() {
    if (!TikTokVideoURL.isTikTokURL(this.#url)) {
      throw new Error('Invalid TikTok URL')
    }

    let parts = this.#url.split('?')
    parts = parts[0].split('/')
    this.#videoID = parts[parts.length - 1]

    if (!TikTokVideoURL.isValidVideoID(this.#videoID)) {
      throw new Error('Invalid video ID')
    }

    return this.#videoID
  }

  /**
   * It splits the url into an array, then it splits the url again, then it replaces the @ symbol with
   * nothing, then it sets the username to the url, then it returns the username.
   *
   * @method
   * @throws {Error} If the URL is invalid.
   * @returns {string} The username of the user who posted the TikTok video.
   * @memberof TikTokVideoURL
   */
  getUsername() {
    if (!TikTokVideoURL.isTikTokURL(this.#url)) {
      throw new Error('Invalid TikTok URL')
    }

    const parts = this.#url.split('/')
    const username = parts[parts.length - 3].replace('@', '')

    if (!TikTokVideoURL.isValidUsername(username)) {
      throw new Error('Invalid username')
    }

    this.#username = username
    return this.#username
  }

  /**
   * It returns a string that is the URL of the TikTok video.
   *
   * @method
   * @returns {string} The return value is a string.
   * @memberof TikTokVideoURL
   */
  getTikTokVideoURL() {
    return `https://www.tiktok.com/@${this.getUsername()}/video/${this.getVideoID()}`
  }

  /**
   * It returns the download URL of the video
   *
   * @method
   * @returns {string} The download URL of the video.
   * @memberof TikTokVideoURL
   */
  getDownloadURL() {
    return `https://www.tikwm.com/video/media/hdplay/${this.getVideoID()}.mp4`
  }

  /**
   * It returns an object that contains the video ID, the username, the TikTok video URL, and the download URL.
   *
   * @method
   * @throws {Error} If the video ID or the username is invalid.
   * @return {object} The return value is an object.
   * @memberof TikTokVideoURL
   */
  createVideoObject() {
    let videoID, username

    try {
      videoID = this.getVideoID()
    } catch (error) {
      throw new Error(`Failed to get video ID: ${error}`)
    }

    try {
      username = this.getUsername()
    } catch (error) {
      throw new Error(`Failed to get username: ${error}`)
    }

    return {
      videoID,
      username,
      tikTokVideoURL: this.getTikTokVideoURL(),
      downloadURL: this.getDownloadURL(),
    }
  }
}

module.exports = TikTokVideoURL
