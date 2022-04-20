import fetchData from '../../fetchData'
import config from '../../../config'
import { setError } from '../../setReply'

async function changePassword(newPassword = null, token = null) {
  try {
    const fetchDataOptions = {
      url: config.api.urls.changePassword,
      method: "POST",
      accepts: "json",
      body: { newPassword, token }
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default changePassword