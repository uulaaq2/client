import fetchData from '../fetchData'
import config from '../../config'
import { setError } from '../../functions/setReply'

async function signIn(email, password) {
  try {
    const fetchDataOptions = {
      url: config.api.urls.signIn,
      method: "POST",
      accepts: "json",
      body: { email, password}
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default signIn