const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream(__dirname + '/console.log', {flags : 'w'});
const logStdout = process.stdout;

const fileLog = function (d){ 
  logFile.write('['+Date()+']'+util.format(d) + '\n');
  logStdout.write(util.format(d) + '\n');
};

module.exports = {fileLog}