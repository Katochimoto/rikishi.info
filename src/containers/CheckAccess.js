import React from 'react'
import { readBioByToken, getToken } from '../data/services'

export default class CheckAccess extends React.Component {
  constructor (...attrs) {
    super(...attrs)
    this.state = {
      token: getToken()
    }
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    if (this.state.token) {
      readBioByToken(this.state.token)
    }
  }

  render () {
    return null
  }
}
