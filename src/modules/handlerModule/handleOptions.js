import downloadSingleVideo from '../downloadModule/downloadSingleVideo.js'
import downloadMultipleVideos from '../downloadModule/downloadMultipleVideos.js'
import showUrlsCount from '../readFileModule/showUrlsCount.js'
import saveUniqueUrlsToFile from '../extractorModule/saveUniqueUrlsToFile.js'

const actions = {
  url: downloadSingleVideo,
  readFile: showUrlsCount,
}

/**
 * The function handles various options and performs corresponding actions.
 * @method
 * @param options - an object containing various options that can be passed to the function. The
 * options can include a "file" property to download multiple videos, an "extractUrls" property to save
 * unique URLs to a file, and an action property to perform a specific action.
 */
function handleOptions(options) {
  const action = actions[Object.keys(options).find((prop) => prop in actions)]

  if (action) {
    action(options[Object.keys(options).find((prop) => prop in actions)])
  }

  if (options.file) {
    downloadMultipleVideos(options.file)
  }

  if (options.extractUrls) {
    saveUniqueUrlsToFile(options.filename, options.extractUrls)
  }

  if (!action && !options.extractUrls) {
    console.error('No action specified')
  }
}

export default handleOptions
