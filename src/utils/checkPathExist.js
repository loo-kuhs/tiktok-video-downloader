import path from 'path'
import { existsSync, mkdirSync } from 'fs'

function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath)
  if (existsSync(dirname)) {
    return true
  }

  ensureDirectoryExistence(dirname)
  mkdirSync(dirname)
}

export default ensureDirectoryExistence
