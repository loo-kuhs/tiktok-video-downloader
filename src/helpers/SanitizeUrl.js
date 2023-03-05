/**
 * This class takes the URL of the TikTok video and sanitizes it, then it returns the video ID, the username of the user who posted the video, the URL of the TikTok video, and the download URL of the video.
 * @property {string} #url - The URL of the TikTok video.
 * @property {string} #videoID - The video ID of the TikTok video.
 * @property {string} #username - The username of the user who posted the TikTok video.
 * @class SanitizeURL
 *
 * @author loo-kuhs
 */
class SanitizeURL {
  #url = ''
  #videoID = ''
  #username = ''

  /**
   * Creates an instance of SanitizeURL.
   * @param {string} url - The URL of the TikTok video.
   * @memberof SanitizeURL
   */
  constructor(url) {
    this.#url = url
  }

  /**
   * It takes the URL of the video, splits it into an array, then takes the last element of the array
   * and assigns it to the videoID property.
   * @method
   * @returns {string} The video ID.
   * @memberof SanitizeURL
   */
  getVideoID() {
    let url = this.#url.split('?')
    url = url[0].split('/')
    url = url[url.length - 1]
    this.#videoID = url
    return this.#videoID
  }

  /**
   * It splits the url into an array, then it splits the url again, then it replaces the @ symbol with
   * nothing, then it sets the username to the url, then it returns the username.
   * @method
   * @returns {string} The username of the user who posted the TikTok video.
   * @memberof SanitizeURL
   */
  getUsername() {
    let url = this.#url.split('?')
    url = url[0].split('/')
    url = url[url.length - 3]
    url = url.replace('@', '')
    this.#username = url
    return this.#username
  }

  /**
   * It returns a string that is the URL of the TikTok video.
   * @method
   * @returns {string} The return value is a string.
   * @memberof SanitizeURL
   */
  getTikTokVideoURL() {
    return `https://www.tiktok.com/@${this.getUsername()}/video/${this.getVideoID()}/`
  }

  /**
   * It returns the download URL of the video
   * @method
   * @returns {string} The download URL of the video.
   * @memberof SanitizeURL
   */
  getDownloadURL() {
    return `https://www.tikwm.com/video/media/hdplay/${this.getVideoID()}.mp4`
  }

  /**
   * It returns an object that contains the video ID, the username, the TikTok video URL, and the download URL.
   * @method
   * @return {object} The return value is an object.
   * @memberof SanitizeURL
   */
  createVideoObject() {
    return {
      videoID: this.getVideoID(),
      username: this.getUsername(),
      tikTokVideoURL: this.getTikTokVideoURL(),
      downloadURL: this.getDownloadURL(),
    }
  }
}

module.exports = SanitizeURL
