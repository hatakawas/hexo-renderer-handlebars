'use strict';


const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

let isPartialsRegistered = false;
const EXTNAME = '.hbs';

function render(data, locals) {
  return doRenderInternal(data, locals);
}

function doRenderInternal(data, locals) {
  const template = Handlebars.compile(data.text);
  // Actually, data.path always be effect in Hexo
  if (!isPartialsRegistered && data.path) {
    console.log('Start register partials....');
    const basedir = data.rootPath || path.dirname(data.path);
    console.log('basedir: ', basedir);
    registerPartials(basedir);
  }
  if (data.path) {
    isPartialsRegistered = true;
  }
  return template(Object.assign({filename: data.path}, locals));
}

function registerPartials(basedir) {
  const files = fs.readdirSync(basedir);
  console.log('files: ', files);
  const partialDirs = [];
  files.forEach(i => {
    const filePath = path.join(basedir, i);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      partialDirs.push(filePath);
    }
  });
  console.log('partialDirs: ', partialDirs);
  const partialFiles = [];
  partialDirs.forEach(d => {
    const list = [];
    partialFiles.push(...listPartialFiles(d, list));
  });
  console.log('found partial files: ', partialFiles);
  partialFiles.forEach(file => {
    const start = basedir.length + 1;
    const length = file.length - start - EXTNAME.length;
    const name = file.substr(start, length);
    const data = fs.readFileSync(file, {encoding: 'utf-8'});
    Handlebars.registerPartial(name, data.trim());
  });
  console.log('list partials: ', Handlebars.partials);
}


function listPartialFiles(dir, list) {
  const files = fs.readdirSync(dir);
  list = list || [];
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      // skip files without ext .hbs
      if (path.extname(filePath) === EXTNAME) {
        list.push(filePath);
      } else {
        console.warn("Skipped file %s because handlebars partial file must have an extension name of %s.", filePath, EXTNAME)
      }
    } else {
      listPartialFiles(filePath, list);
    }
  });
  return list;
}


module.exports = render;
