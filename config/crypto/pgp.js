#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var openpgp = require('openpgp');
var base64js = require('base64-js');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  string: [
    'i',
    'e',
    'p',
    'pp'
  ],
  default: {
    i: '.bio.json',
    e: '',
    p: '',
    pp: ''
  }
});

var passphrase = options.pp;
var password = options.p;
var email = options.e;
var data = require(path.join(process.cwd(), options.i));
data = JSON.stringify(data);

run(data, password, email, passphrase).then(function (data) {
  console.log(data);
});

async function run (data, password, email, passphrase) {
  var encrypted = await encrypt(data, password);
  var privkey = await getPrivkey();
  var signed = await sign(encrypted, privkey, passphrase);

  // var pubkey = await getPubkey(email);
  // encrypted = await verify(signed, pubkey);
  // data = await decrypt(encrypted, password);

  return signed;
}

async function encrypt (data, password) {
  var ciphertext = await openpgp.encrypt({
    armor: false,
    data: data,
    passwords: [
      password
    ]
  });

  var encrypted = ciphertext.message.packets.write();
  encrypted = base64js.fromByteArray(encrypted);

  return encrypted;
}

async function getPubkey (email) {
  // var hkp = new openpgp.HKP('https://pgp.mit.edu');
  // return await hkp.lookup({ query: email });
  return await fs.readFileSync(path.join(__dirname, 'public.asc'), 'utf8');
}

async function getPrivkey () {
  return await fs.readFileSync(path.join(__dirname, 'private.asc'), 'utf8');
}

async function sign (data, privkey, passphrase) {
  var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  privKeyObj.decrypt(passphrase);

  var signed = await openpgp.sign({
    data: data,
    privateKeys: privKeyObj
  });

  return signed.data;
}

async function verify (data, pubkey) {
  data = openpgp.cleartext.readArmored(data);
  pubkey = openpgp.key.readArmored(pubkey);

  var verified = await openpgp.verify({
    message: data,
    publicKeys: pubkey.keys
  });

  var validity = verified.signatures[0].valid;

  if (validity) {
    return data.text;
  }
}

async function decrypt (data, password) {
  data = base64js.toByteArray(data);
  data = openpgp.message.read(data);

  var plaintext = await openpgp.decrypt({
    message: data,
    password: password
  });

  return plaintext.data;
}
