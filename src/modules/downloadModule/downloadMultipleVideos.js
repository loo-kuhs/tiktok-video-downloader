import TikTokVideoURL from '../../helpers/TikTokVideoURL.js'
import UrlLoader from '../../helpers/UrlLoader.js'
import downloadVideo from './downloadVideo.js'

function downloadMultipleVideos(file) {
  const urlLoader = new UrlLoader(file)

  urlLoader.loadUrls()

  const urls = urlLoader.getUrlsArray()
  const urlsCount = urls.length

  console.info(`Loaded ${urlsCount} URLs from ${file}`)

  urls.forEach((url, index) => {
    const ttVideoUrl = new TikTokVideoURL(url)
    const { videoID, username, tikTokVideoURL, downloadURL } =
      ttVideoUrl.createVideoObject()

    console.info(`\nDownloading video ${index + 1} of ${urlsCount}...`)

    downloadVideo(
      { username, videoID, tikTokVideoURL, downloadURL },
      index,
      urlsCount
    )
  })
}

export default downloadMultipleVideos
