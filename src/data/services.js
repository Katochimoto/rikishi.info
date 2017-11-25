import { updateBio } from './actions'

const saveToken = (token) => {
  try {
    window.localStorage.setItem('token', token)
  } catch (error) {}
}

const removeToken = () => {
  try {
    window.localStorage.removeItem('token')
  } catch (error) {}
}

export const getToken = () => {
  try {
    return window.localStorage.getItem('token')
  } catch (error) {}
}

export function readBioByToken (token) {
  return readToken(token)
    .then(readBio)
    .then(data => {
      saveToken(token)
      updateBio(data)
    }, removeToken)
}

function readToken (token) {
  return new Promise(function (resolve, reject) {
    require.ensure([], require => {
      const rs = require('jsrsasign')
      const isValid = rs.jws.JWS.verifyJWT(token, 'H8WpZF2C9Er6OXTkAT1WBjkKosJOmU2C', {
        alg: [ 'HS256' ],
        email: [ 'anton@rikishi.info' ]
        // date: rs.jws.IntDate.get('20150601000000Z')
      })

      if (!isValid) {
        return reject()
      }

      const { email, pass } = rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(token.split('.')[1]))

      if (email && pass) {
        return resolve({ email, pass })
      }

      reject()
    })
  })
}

function readBio ({ email, pass }) {
  return new Promise(function (resolve, reject) {
    require.ensure([], require => {
      const openpgp = require('openpgp')
      const base64js = require('base64-js')
      const data = require('../bio.txt')
      const hkp = new openpgp.HKP('https://pgp.mit.edu')

      hkp.lookup({ query: email })
        .then(pubkey => verify(data, pubkey, { openpgp }))
        .then(encrypted => decrypt(encrypted, pass, { openpgp, base64js }))
        .then(resolve, reject)
    })
  })
}

function verify (data, pubkey, { openpgp }) {
  data = openpgp.cleartext.readArmored(data)
  pubkey = openpgp.key.readArmored(pubkey)

  return new Promise(function (resolve, reject) {
    openpgp.verify({
      message: data,
      publicKeys: pubkey.keys
    })
    .then(verified => {
      if (verified.signatures[0].valid) {
        resolve(data.text)
      } else {
        reject()
      }
    }, reject)
  })
}

function decrypt (data, pass, { openpgp, base64js }) {
  data = base64js.toByteArray(data)
  data = openpgp.message.read(data)

  return new Promise(function (resolve, reject) {
    openpgp.decrypt({
      message: data,
      password: pass
    })
    .then(plaintext => {
      try {
        resolve(JSON.parse(plaintext.data))
      } catch (error) {
        reject(error)
      }
    }, reject)
  })
}
