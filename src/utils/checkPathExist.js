import { existsSync, mkdirSync } from 'fs'
import path from 'path'

function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath)
  if (existsSync(dirname)) {
    return true
  }

  ensureDirectoryExistence(dirname)
  mkdirSync(dirname)
}

export default ensureDirectoryExistence
