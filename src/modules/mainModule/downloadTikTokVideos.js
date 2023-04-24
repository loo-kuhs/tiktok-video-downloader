import downloadSingleVideo from '../downloadModule/downloadSingleVideo.js'
import downloadMultipleVideos from '../downloadModule/downloadMultipleVideos.js'
import showUrlsCount from '../readFileModule/showUrlsCount.js'
import saveUniqueUrlsToFile from '../extractorModule/saveUniqueUrlsToFile.js'

const actions = {
  url: downloadSingleVideo,
  readFile: showUrlsCount,
}

function downloadTikTokVideos(options) {
  const action = actions[Object.keys(options).find((prop) => prop in actions)]

  if (action) {
    action(options[Object.keys(options).find((prop) => prop in actions)])
  }

  if (options.file) {
    downloadMultipleVideos(options.file)
  }

  if (options.extractUrls) {
    saveUniqueUrlsToFile(options.username, options.extractUrls)
  }

  if (!action && !options.extractUrls) {
    console.error('No action specified')
  }
}

export default downloadTikTokVideos
