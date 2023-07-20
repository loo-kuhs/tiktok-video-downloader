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

  constructor(url) {
    if (!TikTokVideoURL.isValidURL(url)) {
      throw new Error('Invalid URL')
    }
    this.#url = url
  }

  static isValidURL(url) {
    try {
      new URL(url)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static isTikTokURL(url) {
    const regex = /^https?:\/\/(?:www\.)?tiktok\.com\/@([^\/]+)\/video\/(\d+)/
    return regex.test(url)
  }

  static isValidVideoID(videoID) {
    const regex = /^\d+$/
    return regex.test(videoID)
  }

  static isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_.?-]+$/g
    return regex.test(username)
  }

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

  getTikTokVideoURL() {
    return `https://www.tiktok.com/@${this.getUsername()}/video/${this.getVideoID()}`
  }

  getDownloadURL() {
    return `https://www.tikwm.com/video/media/hdplay/${this.getVideoID()}.mp4`
  }

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

export default TikTokVideoURL
