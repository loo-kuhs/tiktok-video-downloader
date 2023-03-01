class SanitizeURL {
  #url = ''
  #videoID = ''
  #username = ''

  constructor(url) {
    this.#url = url
  }

  getVideoID() {
    let url = this.#url.split('?')
    url = url[0].split('/')
    url = url[url.length - 1]
    this.#videoID = url
    return this.#videoID
  }

  getUsername() {
    let url = this.#url.split('?')
    url = url[0].split('/')
    url = url[url.length - 3]
    url = url.replace('@', '')
    this.#username = url
    return this.#username
  }

  getTikTokVideoURL() {
    return `https://www.tiktok.com/@${this.getUsername()}/video/${this.getVideoID()}`
  }

  getDownloadURL() {
    return `https://www.tikwm.com/video/media/hdplay/${this.getVideoID()}.mp4`
  }
}

module.exports = SanitizeURL
