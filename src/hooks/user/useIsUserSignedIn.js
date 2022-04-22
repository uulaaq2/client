import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppWrapper'
import config from '../../config'
import { setSuccess, setWarning, setCustom, setError } from '../../functions/setReply'
import isUserSignedIn from '../../functions/isUserSignedIn'

const useIsUserSignedIn = () => {
  const [userData, setUserData] = useState()
  const getAppContext = useAppContext.getAppContext
  const setAppContext = useAppContext.setAppContext

  const main = async () => {
    const isUserSignedInResult = await isUserSignedIn()    

    setAppContext({
      ...getAppContext,
      user: {
        ...isUserSignedInResult.decryptedData
      }
    })  
    
    setUserData(isUserSignedInResult)
  }

  useEffect(() => {
    main()
  }, [])

  return [userData]
};

export default useIsUserSignedIn;