import fetchData from '../../fetchData'
import config from '../../../config'
import { setError } from '../../setReply'

async function getResetPasswordLink(emailAddress) {
  try {
    const fetchDataOptions = {
      url: config.api.urls.emailResetPasswordLink,
      method: "POST",
      accepts: "json",
      body: { email: emailAddress, linkToUrl: 'http://localhost:3000' + config.urls.resetPassword.path }
    }
  
    const fetchDataResult = await fetchData(fetchDataOptions)

    return fetchDataResult
  } catch (error) {
    return setError(error)
  }
}

export default getResetPasswordLink