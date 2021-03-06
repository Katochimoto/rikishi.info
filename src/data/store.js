import { ReduceStore } from 'flux/utils'
import { isFSA } from 'flux-standard-action'
import dispatcher from './dispatcher'
import userpic from '../images/avatar.jpg'
import photo from '../images/photo.png'

class BioStore extends ReduceStore {
  getInitialState () {
    return {
      access: 'public',
      facebook: 'https://facebook.com/tursenev',
      github: 'https://github.com/Katochimoto',
      linkedin: 'https://linkedin.com/in/rikishi/',
      nickname: 'rikishi',
      role: 'Web Developer',
      userpic: userpic,
    }
  }

  hasAccess () {
    const { access } = this.getState()
    return access === 'private'
  }

  reduce (state, action) {
    if (!isFSA(action)) {
      return state
    }

    const {
      error,
      payload,
      type,
    } = action

    switch (type) {
      case 'UPDATE_BIO':
        return {
          ...state,
          ...payload,
          userpic: photo,
          access: 'private',
        }
      default:
        return state
    }
  }
}

export default new BioStore(dispatcher)
