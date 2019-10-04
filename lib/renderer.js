'use strict';


const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

let isPartialsRegistered = false;
const PARTIAL_EXTNAME = '.hbs';

function render(data, locals) {
  return doRenderInternal(data, locals);
}

function doRenderInternal(data, locals) {
  const template = Handlebars.compile(data.text);
  // Actually, data.path always be effective in Hexo
  if (!isPartialsRegistered && data.path) {
    const basedir = data.rootPath || path.dirname(data.path);
    registerPartials(basedir);
  }
  if (data.path) {
    isPartialsRegistered = true;
  }
  return template(Object.assign({filename: data.path}, locals));
}

function registerPartials(basedir) {
  const files = fs.readdirSync(basedir);
  const partialDirs = [];
  files.forEach(file => {
    const filePath = path.join(basedir, file);
    const stat = fs.statSync(filePath);
    // partial dir must start with '_'
    if (stat.isDirectory() && file.startsWith('_')) {
      partialDirs.push(filePath);
    }
  });
  const partialFiles = [];
  partialDirs.forEach(d => {
    partialFiles.push(...listPartialFiles(d));
  });
  partialFiles.forEach(file => {
    const start = basedir.length + 1;
    const length = file.length - start - PARTIAL_EXTNAME.length;
    const name = file.substr(start, length);
    const data = fs.readFileSync(file, {encoding: 'utf-8'});
    Handlebars.registerPartial(name, data);
  });
}


function listPartialFiles(dir, list = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()){
      // partial file must have '.hbs' extname.
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
