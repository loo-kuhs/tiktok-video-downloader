const SanitizeURL = require('./helpers/SanitizeUrl')
const UrlLoader = require('./helpers/UrlLoader')
const downloadVideo = require('./utils/downloadVideo')
const packageJson = require('../package.json')
const { program } = require('commander')

program
  .name('tiktok-video-downloader')
  .description('Download TikTok videos')
  .version(packageJson.version, '-v, --version', 'Display version number')

program
  .option(`--url <url>`, 'URL to download')
  .option(`--file <file>`, 'File containing URLs to download')
  .option('--version', 'Display version number')
program.parse()

const options = program.opts()

if (options.version) {
  console.info(packageJson.version)
  process.exit(0)
}

if (options.url) {
  const sanitizeURL = new SanitizeURL(options.url)
  const { videoID, username, tikTokVideoURL, downloadURL } =
    sanitizeURL.createVideoObject()
  downloadVideo({ username, videoID, tikTokVideoURL, downloadURL })
}

if (options.file) {
  const urlLoader = new UrlLoader(options.file)

  urlLoader.loadUrls()
  console.info(`Loaded ${urlLoader.getUrlsCount()} URLs from ${options.file}`)

  const urls = urlLoader.getUrlsArray()

  urls.forEach((url, index) => {
    const sanitizeURL = new SanitizeURL(url)
    const { videoID, username, tikTokVideoURL, downloadURL } =
      sanitizeURL.createVideoObject()

    console.info(`\nDownloading video ${index + 1} of ${urls.length}...`)
    downloadVideo({ username, videoID, tikTokVideoURL, downloadURL })
  })
}
