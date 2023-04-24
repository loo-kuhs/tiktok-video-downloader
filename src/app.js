import { program } from 'commander'

import version from './utils/obtainVersionFromPkg.js'
import downloadTikTokVideos from './modules/mainModule/downloadTikTokVideos.js'

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

downloadTikTokVideos(options)
