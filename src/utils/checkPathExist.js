const path = require('path')
const fs = require('fs')

function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }

  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

module.exports = ensureDirectoryExistence
