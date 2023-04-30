import { program } from 'commander'

import version from './utils/obtainVersionFromPkg.js'
import handleOptions from './modules/handlerModule/handleOptions.js'

program
  .name('tiktok-video-downloader')
  .description('Download TikTok videos')
  .version(version, '-v, --version', 'Display version number')
  .option(`-u, --url <url>`, 'URL to download')
  .option(`-f, --file <file>`, 'File containing URLs to download')
  .option(`-r, --read-file <file>`, 'File containing URLs to download')
  .option(
    `-e, --extract-urls <file>`,
    'Extract URLs from a TXT file with HTML content and save them to a TXT file'
  )
  .option(`-n, --filename <username>`, 'Name the TXT file with extracted urls')
  .helpOption(`-h, --help`, 'Display help')
  .parse(process.argv)

const options = program.opts()

handleOptions(options)
