#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var openpgp = require('openpgp');
var base64js = require('base64-js');

var pubkey = fs.readFileSync(path.join(__dirname, 'pubkey.asc'), 'utf-8');
var privkey = fs.readFileSync(path.join(__dirname, 'private.asc'), 'utf-8');



var options = {
    data: 'Hello, World!',
    passwords: ['secret stuff'],
    armor: false
};

openpgp.encrypt(options).then(function(ciphertext) {
    var encrypted = ciphertext.message.packets.write();
    encrypted = base64js.fromByteArray(encrypted);
    //var encrypted = ciphertext.data;
    console.log(encrypted);

    var hkp = new openpgp.HKP('https://pgp.mit.edu');

    var options = {
        query: 'bufpost@yandex.ru'
    };

    hkp.lookup(options).then(function(key) {
        var pubkey = openpgp.key.readArmored(key);
        var passphrase = '';
        var privkey = fs.readFileSync(path.join(__dirname, 'private.asc'), 'utf-8');

        var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
        privKeyObj.decrypt(passphrase);

        var options = {
            data: encrypted,
            privateKeys: privKeyObj
        };

        openpgp.sign(options).then(function(signed) {
            cleartext = signed.data;

            console.log(cleartext);

            var message = openpgp.cleartext.readArmored(cleartext);

            var options = {
                message: message,
                publicKeys: pubkey.keys
            };

            openpgp.verify(options).then(function(verified) {
              validity = verified.signatures[0].valid; // true
              if (validity) {
                console.log('signed by key id ' + verified.signatures[0].keyid.toHex());

                var encrypted = base64js.toByteArray(message.text);


                    options = {
                        message: openpgp.message.read(encrypted), // parse encrypted bytes
                        password: 'secret stuff',                 // decrypt with password
                        //format: 'binary'                          // output as Uint8Array
                    };

                    openpgp.decrypt(options).then(function(plaintext) {
                        console.log(plaintext.data);
                    });
              }
            });
        });
    });
});




// var hkp = new openpgp.HKP('https://pgp.mit.edu');

// var options = {
//     query: 'bufpost@yandex.ru'
// };

// hkp.lookup(options).then(function(key) {
//     var pubkey = openpgp.key.readArmored(key);
//     var passphrase = 'no pain no gain';
//     var privkey = fs.readFileSync(path.join(__dirname, 'private.asc'), 'utf-8');

//     var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
//     privKeyObj.decrypt(passphrase);

//     var options = {
//         data: 'Hello, World!',
//         privateKeys: privKeyObj
//     };

//     openpgp.sign(options).then(function(signed) {
//         cleartext = signed.data;

//         console.log(cleartext);

//         var options = {
//             message: openpgp.cleartext.readArmored(cleartext),
//             publicKeys: pubkey.keys
//         };

//         openpgp.verify(options).then(function(verified) {
//           validity = verified.signatures[0].valid; // true
//           if (validity) {
//             console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
//           }
//         });
//     });


//     // var options = {
//     //     data: 'Hello, World!',
//     //     publicKeys: pubkey.keys,
//     //     privateKeys: privKeyObj
//     // };

//     // openpgp.encrypt(options).then(function(ciphertext) {
//     //     var encrypted = ciphertext.data;
//     //     //console.log('encrypted', encrypted);

//     //     var options = {
//     //         message: openpgp.message.readArmored(encrypted),     // parse armored message
//     //         publicKeys: pubkey.keys,    // for verification (optional)
//     //         privateKey: privKeyObj // for decryption
//     //     };

//     //     openpgp.decrypt(options).then(function(plaintext) {
//     //         //console.log(plaintext.data)
//     //         return plaintext.data; // 'Hello, World!'
//     //     });
//     // });
// });


function uintToString(uintArray) {
  var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent(escape(encodedString));
  return decodedString;
}

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}
