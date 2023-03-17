import { program } from 'commander'

import downloadVideo from './utils/downloadVideo.js'
import infoConsoleLog from './utils/infoConsoleLog.js'
import saveUniqueUrlsToFile from './utils/saveUniqueUrlsToFile.js'
import TikTokVideoURL from './helpers/TikTokVideoURL.js'
import UrlLoader from './helpers/UrlLoader.js'
import version from './utils/obtainVersionFromPkg.js'

program
  .name('tiktok-video-downloader')
  .description('Download TikTok videos')
  .version(version, '-v, --version', 'Display version number')
  .option(`--url <url>`, 'URL to download')
  .option(`--file <file>`, 'File containing URLs to download')
  .option(`--read-file <file>`, 'File containing URLs to download')
  .option(
    `--extract-urls <file>`,
    'Extract URLs from a TXT file with HTML content and save them to a TXT file'
  )
  .option(`-u, --username <username>`, 'Username to download videos from')
  .parse(process.argv)

const options = program.opts()

if (options.url) {
  const ttVideoUrl = new TikTokVideoURL(options.url)
  const { videoID, username, tikTokVideoURL, downloadURL } =
    ttVideoUrl.createVideoObject()
  downloadVideo({ username, videoID, tikTokVideoURL, downloadURL })
}

if (options.file) {
  const urlLoader = new UrlLoader(options.file)

  urlLoader.loadUrls()
  console.info(`Loaded ${urlLoader.getUrlsCount()} URLs from ${options.file}`)

  const urls = urlLoader.getUrlsArray()

  urls.forEach((url, index) => {
    const ttVideoUrl = new TikTokVideoURL(url)
    const { videoID, username, tikTokVideoURL, downloadURL } =
      ttVideoUrl.createVideoObject()

    console.info(`\nDownloading video ${index + 1} of ${urls.length}...`)
    downloadVideo(
      { username, videoID, tikTokVideoURL, downloadURL },
      index,
      urls.length
    )
  })
}

if (options.readFile) {
  const urlLoader = new UrlLoader(options.readFile)

  urlLoader.loadUrls()
  console.info(`This file contains ${urlLoader.getUrlsCount()} URLs`)

  const urls = urlLoader.getUrlsArray()

  urls.forEach((url, index) => {
    const ttVideoUrl = new TikTokVideoURL(url)
    const { videoID, username, tikTokVideoURL, downloadURL } =
      ttVideoUrl.createVideoObject()

    infoConsoleLog(
      index,
      urls.length,
      username,
      videoID,
      tikTokVideoURL,
      downloadURL
    )
  })
}

if (options.extractUrls) {
  saveUniqueUrlsToFile(options.username, options.extractUrls)
}
