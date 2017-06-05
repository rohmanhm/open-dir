"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var path = require("path");
var program = require("commander");
var execa = require('execa');
program
    .usage('[path] <folder ...>')
    .parse(process.argv);
var customFolder = program.args[0];
var folder = customFolder
    ? path.resolve(process.cwd(), customFolder)
    : process.cwd();
function execCMD(command) {
    execa.shell(command);
}
switch (os.platform()) {
    // Windows
    case 'win32':
        execCMD("explorer " + folder);
        break;
    // macOS or OSX
    case 'darwin':
        execCMD("open " + folder + " -a finder");
        break;
    // Linux
    case 'linux':
        execCMD("nautilus " + folder);
        break;
    default:
        console.error(os.platform() + " unsupported yet.");
        break;
}
exports.default = program;
//# sourceMappingURL=index.js.map