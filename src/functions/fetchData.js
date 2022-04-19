import { setCustom, setError, setSuccess } from "./setReply";
import { getCookie } from './cookie'

const acceptTypes = {
  json: {
    credentials: "include",
    headers: {        
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
}

async function fetchData(options) {
  try {
    const url = options.url
    const method = options.method
    const accepts = options.accepts
    const optionsBody = { ...options.body }
    const cookieName = options.cookieName

    const headers = {      
      method,
      ...acceptTypes[accepts]
    }

    /*if (cookieName) {
      const getCookieResult = getCookie(cookieName)
      if (getCookieResult.status !== 'ok') {
        return getCookieResult
      }
      
      if (getCookieResult.value) {
        optionsBody[cookieName] = getCookieResult.value
      }
    }*/

    const fetchOptions = {
      ...headers,      
      body: JSON.stringify({ ...optionsBody })
    }

    console.log('aaa fetchoptions ', fetchOptions)

    const fetchDataResult = await fetch(url, fetchOptions)    
    const result = await fetchDataResult.json()

    return result    

  } catch (error) {
    return setError(error)
  }
}

export default fetchData