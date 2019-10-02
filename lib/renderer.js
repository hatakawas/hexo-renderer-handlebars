'use strict';


const handlebars = require('handlebars');

// const fs = require('fs');

function doRenderInternal(data, locals) {
  let template = handlebars.compile(data.text);
  return template(Object.assign({filename: data.path}, locals));
}

function render(data, locals) {
  return doRenderInternal(data, locals);
}

module.exports = render;
