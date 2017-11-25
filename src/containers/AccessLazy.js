import Bundle from './Bundle'
import { readBioByToken, getToken } from '../data/services'
import Loading from '../components/Loading'
import loadAccess from 'bundle-loader?lazy!../components/Access'

export default function AccessLazy (props) {

  function onLoadSuccess (Access) {
    if (!Access) {
      return (
        <Loading />
      )
    }

    const {
      history,
      match: { params: { token } }
    } = props

    const fromLocation = props.location &&
      props.location.state &&
      props.location.state['from'] || '/'

    const localToken = getToken()

    if (token || localToken) {
      readBioByToken(token || localToken)
        .then(
          () => history.replace(fromLocation),
          () => history.replace('/access')
        )

      return (
        <Loading />
      )
    }

    return (
      <Access {...props} />
    )
  }

  return (
    <Bundle load={loadAccess}>
      {onLoadSuccess}
    </Bundle>
  )
}
