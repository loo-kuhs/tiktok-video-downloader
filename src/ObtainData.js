class SanitizeURL {
  #url = ''
  #videoID = ''
  #username = ''

  constructor(url) {
    this.#url = url
  }

  /**
   * It takes the URL of the video, splits it into an array, then takes the last element of the array
   * and assigns it to the videoID property.
   * @returns {string} The video ID.
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
   * @returns {string} The username of the user who posted the TikTok video.
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
   * @returns {string} The return value is a string.
   */
  getTikTokVideoURL() {
    return `https://www.tiktok.com/@${this.getUsername()}/video/${this.getVideoID()}`
  }

  /**
   * It returns the download URL of the video
   * @returns {string} The download URL of the video.
   */
  getDownloadURL() {
    return `https://www.tikwm.com/video/media/hdplay/${this.getVideoID()}.mp4`
  }
}

module.exports = SanitizeURL
