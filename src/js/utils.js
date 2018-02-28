const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream(__dirname + '/console.log', { flags: 'w' });
const logStdout = process.stdout;

const languages = {
  es: require("./lang/es.json"),
  en: require("./lang/en.json")
}

export function fileLog(d) {
  logFile.write('[' + Date() + ']' + util.format(d) + '\n');
  logStdout.write(util.format(d) + '\n');
};

export function loadJson(d) {
  const f = require(`./${d}`)
  return JSON.parse(f)
};

export function getLanguage(get) {
  const lang = get()
  return languages[lang]
};

export function loadLanguage(self, get, langs, wind) {
  const lang = get()
  console.log(lang)
  self.fileText = langs[lang]
  if (wind != "")
    self.text = langs[lang].windows[wind]
};

export async function asyncLoad(p) {

};

export function throwJsError(err) {
  shell.openExternal("https://stackoverflow.com/search?q=[js]+$(err)")
};

