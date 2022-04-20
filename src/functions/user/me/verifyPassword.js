import fetchData from '../../fetchData'
import config from '../../../config'
import { setError } from '../../setReply'

async function verifyPassword(password = null, token = null) {
  try {
    const fetchDataOptions = {
      url: config.api.urls.verifyPassword,
      method: "POST",
      accepts: "json",
      body: { password, token }
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default verifyPassword