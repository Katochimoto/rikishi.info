#!/usr/bin/env node

var base64js = require('base64-js');
var rs = require('jsrsasign');

// Header
var oHeader = {alg: 'HS256', typ: 'JWT'};
// Payload
var oPayload = {};
var tNow = rs.jws.IntDate.get('now');
var tEnd = rs.jws.IntDate.get('now + 1day');
oPayload.iss = "http://foo.com";
oPayload.sub = "mailto:mike@foo.com";
oPayload.nbf = tNow;
oPayload.iat = tNow;
oPayload.exp = tEnd;
oPayload.jti = "id123456";
oPayload.aud = "http://foo.com/employee";
// Sign JWT, password=616161
var sHeader = JSON.stringify(oHeader);
var sPayload = JSON.stringify(oPayload);
var sJWT = rs.jws.JWS.sign("HS256", sHeader, sPayload, "616161");

console.log(sJWT + '\n');


var isValid = rs.jws.JWS.verifyJWT(sJWT, "616161", {
  alg: ['HS256'],
  sub: ['mailto:mike@foo.com',
  'mailto:kate@foo.com'],
  //verifyAt: rs.jws.IntDate.get('20150601000000Z')
});

console.log(isValid + '\n');

var headerObj = rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(sJWT.split(".")[0]));
var payloadObj = rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(sJWT.split(".")[1]));

console.log(headerObj);

console.log(payloadObj);


