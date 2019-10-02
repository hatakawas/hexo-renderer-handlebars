/* global hexo */

'use strict';

const render = require('./lib/renderer');

hexo.extend.renderer.register('hbs', 'html', render, true);
