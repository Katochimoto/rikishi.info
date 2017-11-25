#!/usr/bin/env node

var rs = require('jsrsasign');
var base64js = require('base64-js');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  string: [
    'e', // email
    'p', // password
    'pt' // password token
  ],
  default: {
    e: '',
    p: '',
    pt: ''
  }
});

var sHeader = JSON.stringify({
  alg: 'HS256',
  typ: 'JWT'
});

var sPayload = JSON.stringify({
  email: options.e,
  pass: options.p,
  date: rs.jws.IntDate.get('now')
});

var sJWT = rs.jws.JWS.sign('HS256', sHeader, sPayload, options.pt);

console.log('https://rikishi.info/#/access/' + encodeURIComponent(sJWT));
