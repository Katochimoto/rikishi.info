import { Container } from 'flux/utils'
import bioStore from '../data/store'
import Bio from '../components/Bio'

function getStores () {
  return [
    bioStore,
  ]
}

function getState () {
  const bio = bioStore.getState()

  return {
    bio,
  }
}

export default Container.createFunctional(Bio, getStores, getState)
