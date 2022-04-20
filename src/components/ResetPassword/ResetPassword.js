import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import config from '../../config'
import { ConstructionOutlined } from '@mui/icons-material';

const ResetPassword = () => {
    const { token } = useParams()    
    const navigate = useNavigate()
    const [showShouldChangePassword, setShowShouldChangePassword] = useState(true)
    
    const homePage = config.urls.home

    useEffect(() => {
      if (!token) {
          navigate('/signin')
      }   

    }, [])
    
    
    return (
        <ChangePassword 
          openStateControllers = {{showShouldChangePassword, setShowShouldChangePassword}}
          requireCurrentPassword = {false}
          rememberMe = {false}
          token = {token}
          redirectTo = {homePage}
        />
    );
};

export default ResetPassword;