import { getCookie } from './cookie'
import { setError, setWarning } from './setReply'
import verifyToken from './verifyToken'

async function isUserSignedIn() {  
  try {
    const token = getCookie('token')
    if (!token) {  
      return setWarning('No token is provided')
    }
    
    const verifyTokenResult = await verifyToken()

    return verifyTokenResult
  } catch (error) {
    return setError(error)
  }
}

export default isUserSignedIn


