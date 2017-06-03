import os = require('os')
import path = require('path')
import program = require('commander')

const execa = require('execa')

program
  .usage('[path] <folder ...>')
  .parse(process.argv)

const [customFolder] = program.args

const folder = customFolder
  ? path.resolve(process.cwd(), customFolder)
  : process.cwd()

function execCMD (command: string) {
  execa.shell(command)
}

switch (os.platform()) {
  // Windows
  case 'win32':
    execCMD(`explorer ${ folder }`)
    break

  // macOS or OSX
  case 'darwin':
    execCMD(`open ${ folder } -a finder`)
    break

  // Linux
  case 'linux':
    execCMD(`nautilus ${ folder }`)
    break

  default:
    console.error(`${ os.platform() } unsupported yet.`)
    break
}

export default program
