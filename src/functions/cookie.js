import { cookieExpiresIn } from "../config/config.global"
import { setCustom, setError, setSuccess } from "./setReply"

export function setCookie(name, value, useCookieExpiresIn = true) {
  try {        
    let expires = ''
    if (useCookieExpiresIn) {
      let date = new Date();
      date.setTime(date.getTime() + (cookieExpiresIn * 24 * 60 * 60 * 1000));
      expires = "expires=" + date.toUTCString();
    }
    
    document.cookie = name + "=" + value + "; " + expires + "; path=/";    
  
    let data = {
      name,
      value
    }

    return setSuccess(data)
  } catch (error) {
    return setError(error)
  }
}

export function getCookie(name) {
  try {
    name += "="
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    
    const data = {
      name,
      value: res
    }

    return setSuccess(data)
  } catch (error) {
    return setError(error)
  }
}