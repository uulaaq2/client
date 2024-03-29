import fetchData from './fetchData'
import config from '../config'
import { setError } from './setReply'
import { getCookie } from './cookie'

async function getDrawings(searchText) {
  try {
    const token = getCookie('token').value
    const fetchDataOptions = {
      url: config.api.urls.getDrawings,
      method: "POST",
      accepts: "json",
      body: { token, searchText }
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default getDrawings