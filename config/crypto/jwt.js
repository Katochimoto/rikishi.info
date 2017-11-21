#!/usr/bin/env node

var rs = require('jsrsasign');
var base64js = require('base64-js');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  string: [
    'e',
    'p',
    'pt'
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


// var isValid = rs.jws.JWS.verifyJWT(sJWT, "616161", {
//   alg: ['HS256'],
//   sub: ['mailto:mike@foo.com',
//   'mailto:kate@foo.com'],
//   //verifyAt: rs.jws.IntDate.get('20150601000000Z')
// });

// console.log(isValid + '\n');

// var headerObj = rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(sJWT.split(".")[0]));
// var payloadObj = rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(sJWT.split(".")[1]));

// console.log(headerObj);

// console.log(payloadObj);


