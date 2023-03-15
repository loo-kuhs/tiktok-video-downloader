const fs = require('fs')

async function urlsToTxtFile(username, htmlFile) {
  let html = fs.readFileSync(htmlFile, 'utf8')

  const regex = /<a href="(.+?)"/g
  let m
  let urls = []
  while ((m = regex.exec(html)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        urls.push(match)
      }
    })
  }

  let uniqueUrls = [...new Set(urls)]
  let uniqueUrlsString = uniqueUrls.join('\n')
  const nameFile = `downloads/${username}-urls.txt`

  fs.writeFileSync(nameFile, uniqueUrlsString, { encoding: 'utf8', flag: 'w' })

  console.info(`\n
    ${uniqueUrls.length} URLs extracted from ${htmlFile}
    Saved to ${nameFile}
  \n`)
}

module.exports = { urlsToTxtFile }
