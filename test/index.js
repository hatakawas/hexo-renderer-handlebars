'use strict';


//
// let should = require('chai').should(); // eslint-disable-line
const chai = require('chai');

const assert = chai.assert;


describe('Handlebars renderer tests', function() {
  const render = require('../lib/renderer');

  it('escaped variable test', function() {
    const source = 'Hello, {{name}}!';

    const result = render({text: source}, {
      name: 'handlebars'
    });
    assert.equal(result, 'Hello, handlebars!');
  });

  it('unescaped variable test', function() {
    const source = 'Hello {{{ name }}}!';
    const result = render({text: source}, {
      name: '<b>world</b>'
    });
    assert.equal(result, 'Hello <b>world</b>!');
  });

  // it('empty lists test', function() {
  //   const body = [
  //     'Shown.',
  //     '{{ #name }}',
  //     'Never Shown!',
  //     '{{ /name }}'
  //   ].join('');
  //
  //   const data = {
  //     name: false
  //   };
  //
  //   r({text: body}, data).should.eql('Shown.');
  // });
  //
  // it('Non-Empty array test', function() {
  //   const body = [
  //     '{{ #arr }}',
  //     '{{.}}',
  //     '{{ /arr }}'
  //   ].join('');
  //
  //   const data = {
  //     arr: [1, 2, 3]
  //   };
  //
  //   r({text: body}, data).should.eql('123');
  // });
  //
  // it('Non-Empty object test', function() {
  //   const body = [
  //     '{{ #stooges }}',
  //     '{{name}}',
  //     '{{ /stooges }}'
  //   ].join('');
  //
  //   const data = {
  //     'stooges': [
  //       {'name': 'Moe'},
  //       {'name': 'Larry'},
  //       {'name': 'Curly'}
  //     ]
  //   };
  //
  //   r({text: body}, data).should.eql('MoeLarryCurly');
  // });
  //
  // it('functions test', function() {
  //   const body = [
  //     '{{#bold}}Hello {{name}}!{{/bold}}'
  //   ].join('\n');
  //
  //   r({text: body}, {
  //     name: 'world',
  //     'bold': function() {
  //       return function(text, render) {
  //         return '<b>' + render(text) + '</b>';
  //       };
  //     }
  //   }).should.eql('<b>Hello world!</b>');
  // });
  //
  // it('inverted sections test', function() {
  //   const body = [
  //     '{{#repos}}<b>{{name}}</b>{{/repos}}',
  //     '{{^repos}}No repos :({{/repos}}'
  //   ].join('');
  //
  //   r({text: body}, {
  //     repos: []
  //   }).should.eql('No repos :(');
  // });
  //
  // it('escaped variable test', function() {
  //   const body = [
  //     'Hello{{! ignore me }}!'
  //   ].join('\n');
  //
  //   r({text: body}).should.eql('Hello!');
  // });
  //
  // it('compile test', function() {
  //   const body = [
  //     'Hello {{ name }}!'
  //   ].join('\n');
  //
  //   const render = r.compile({
  //     text: body
  //   });
  //
  //   render({
  //     name: 'world'
  //   }).should.eql('Hello world!');
  // });
  //
  // it('partials test', function () {
  //   var body = [
  //     'Hello {{> _partial/test-partial }}!'
  //   ].join('\n')
  //
  //   r({text: body, path: 'test/test.mustache'}).should.eql('Hello world!')
  // })
});
