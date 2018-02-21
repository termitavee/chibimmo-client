const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream(__dirname + '/console.log', { flags: 'w' });
const logStdout = process.stdout;

export function fileLog(d) {
  logFile.write('[' + Date() + ']' + util.format(d) + '\n');
  logStdout.write(util.format(d) + '\n');
};

export function loadJson(d) {
  console.log(__dirname)
  console.log(d)
  const f = require(`./${d}`)

  console.log(f)
  return JSON.parse(f)
};

export function asyncLoad(p) {

};

export function throwJsError(err) {
  shell.openExternal("https://stackoverflow.com/search?q=[js]+$(err)")
};

