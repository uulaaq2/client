import fetchData from './fetchData'
import config from '../config'
import { setError } from './setReply'

async function verifyToken(newPassword = null, token = null) {
  try {
    const fetchDataOptions = {
      url: config.api.urls.verifyToken,
      method: "POST",
      accepts: "json",
      cookieName: "token"
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default verifyToken