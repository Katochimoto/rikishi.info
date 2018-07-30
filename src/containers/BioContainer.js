import { Container } from 'flux/utils'
import bioStore from '../data/store'
import Bio from '../components/Bio'

function getStores () {
  return [
    bioStore,
  ]
}

function getState (prevState, props) {
  const bio = bioStore.getState()

  return {
    ...props,
    bio,
  }
}

export default Container.createFunctional(Bio, getStores, getState, {
  withProps: true,
  withContext: true,
})
