import TikTokVideoURL from '../../helpers/TikTokVideoURL.js'
import downloadVideo from './downloadVideo.js'

function downloadSingleVideo(url) {
  const ttVideoUrl = new TikTokVideoURL(url)
  const { videoID, username, tikTokVideoURL, downloadURL } =
    ttVideoUrl.createVideoObject()
  downloadVideo({ username, videoID, tikTokVideoURL, downloadURL })
}

export default downloadSingleVideo
