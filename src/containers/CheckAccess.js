import { readBioByToken, getToken } from '../data/services'

export default function CheckAccess () {
  const token = getToken()

  if (token) {
    readBioByToken(token)
  }

  return null
}
