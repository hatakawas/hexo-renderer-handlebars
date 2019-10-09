'use strict';


const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

const PARTIAL_EXTNAME = '.hbs';

let isPartialsRegistered = false;
let hexo = {};


function render(data, locals) {
  hexo = this;
  const partialBasedir = hexo ? path.join(hexo.theme_dir, 'layout') : data.rootPath;
  if (!isPartialsRegistered && fs.existsSync(partialBasedir) && fs.statSync(partialBasedir).isDirectory()) {
    registerPartials(partialBasedir);
    isPartialsRegistered = true;
  }
  const context = Object.assign({filename: data.path}, locals);
  return Handlebars.compile(data.text)(context);
}


function registerPartials(partialBasedir) {
  const partialFiles = listPartialFiles(partialBasedir);
  const partialNames = [];
  partialFiles.forEach(file => {
    const start = partialBasedir.length + 1;
    const length = file.length - start - PARTIAL_EXTNAME.length;
    const name = file.substr(start, length);
    const data = fs.readFileSync(file, {encoding: 'utf-8'});
    partialNames.push(name);
    Handlebars.registerPartial(name, data);
  });
  const logger = hexo ? hexo.log : console;
  logger.info('Registered handlebars partials:', partialNames);
}

function listPartialFiles(dir, list) {
  const files = fs.readdirSync(dir);
  list = list || [];
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      // Partial file must have '.hbs' extname.
      if (path.extname(filePath) === PARTIAL_EXTNAME) {
        list.push(filePath);
      }
    } else {
      listPartialFiles(filePath, list);
    }
  });
  return list;
}


module.exports = render;
