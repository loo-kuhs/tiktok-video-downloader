const TikTokVideoURL = require('./helpers/TikTokVideoURL')
const UrlLoader = require('./helpers/UrlLoader')
const downloadVideo = require('./utils/downloadVideo')
const urlsToTxtFile = require('./utils/extractUrlsFromHTML')
const infoConsoleLog = require('./utils/infoConsoleLog')
const packageJson = require('../package.json')
const { program } = require('commander')

program
  .name('tiktok-video-downloader')
  .description('Download TikTok videos')
  .version(packageJson.version, '-v, --version', 'Display version number')
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
  urlsToTxtFile(options.username, options.extractUrls)
}
