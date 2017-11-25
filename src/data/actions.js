import dispatcher from './dispatcher'

export function updateBio (data) {
  dispatcher.dispatch({
    type: 'UPDATE_BIO',
    payload: data,
  })
}
