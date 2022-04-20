import { setCustom, setError, setSuccess } from "./setReply";
import { getCookie } from './cookie'
import { JavascriptOutlined } from "@mui/icons-material";

const acceptTypes = {
  json: {
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
    const accepts = {
      headers: {
        ...acceptTypes[options.accepts]
      }
    } 
    let body = options.body
    let addToBody = {}

    const cookieName = options.cookieName
    if (cookieName) {
      const cookieValueResult = getCookie(cookieName)
      if (cookieValueResult.status !== 'ok') {
        return cookieValueResult
      }

      addToBody = {
        [cookieName]: cookieValueResult.value
      }
    }    
    
    body = {...body, ...addToBody}

    const fetchOptions = {
      method,
      ...accepts,
      body: JSON.stringify({ ...body })
    }

    const fetchResult = await fetch(url, fetchOptions)
    
    return await fetchResult[options.accepts]() 
  
  } catch (error) {
    return setError(error)
  }
}

export default fetchData