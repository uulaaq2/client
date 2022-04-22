import styles from './styles.module.css'
import React, { useState, useRef, useEffect } from 'react'
import config from '../../config'
import logo from '../../images/logo.png'
import { btnOk } from '../../themes/buttonVariants'
import validateInputFields from '../../functions/validateInputFields'
import signIn from '../../functions/signIn/signIn'
import { setCookie} from '../../functions/cookie'
import { useAppContext } from '../../context/AppWrapper'
import ChangePassword from '../ChangePassword/ChangePassword'
import ForgotPassword from '../ForgotPassword/ForgotPassword'

import InputAlert from '../Alerts/InputAlert'
import FormAlert from '../Alerts/FormAlert'

import { Grid, Paper, FormGroup, TextField, FormControlLabel, Checkbox, Stack, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const rememberMeRef = useRef(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [erroredInputFields, setErroredInputFields] = useState([])
  const [showShouldChangePassword, setShowShouldChangePassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  
  const homePage = config.urls.home
  const appName = config.app.name

  const getAppContext = useAppContext().getAppContext
  const setAppContext = useAppContext().setAppContext

  const formInputs = {
    email :{
      validate: true,
      name: 'Email address',
      required: true,
      ref: emailRef,
      setErrorText: function(errorText) {
        setEmailError(errorText)
      }
    },
    password: {    
      validate: true,
      name: 'Password',
      required: true,
      ref: passwordRef,
      setErrorText: function(errorText) {
        setPasswordError(errorText)
      }
    },
    rememberMe: {
      validate: false,
      ref: rememberMeRef
    },
    setErroredInputFields: function(erroredInputFields) {
      setErroredInputFields([...erroredInputFields])
    }
  }

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {    
    if (erroredInputFields.length === 0) return
    
    erroredInputFields[0].focus()
  }, [erroredInputFields])

  async function handleFormSubmit() {
    try {
      setInProgress(true)
      const validateInputFieldsResult = validateInputFields(formInputs)
      if (validateInputFieldsResult.status !== 'ok') {
        setInProgress(false)
        return
      }

      const emailAddress = formInputs.email.ref.current.value
      const password = formInputs.password.ref.current.value
      const rememberMe = formInputs.rememberMe.ref.current.checked
  
      const signInResult = await signIn(emailAddress, password, rememberMe)      
      if (signInResult.status !== 'ok') {
        if (signInResult.status === 'warning') {
          throw new Error('Invalid Email address or Password')
        }

        if (signInResult.status === 'accountIsExpired') {
          throw new Error('Your account is expired, please contact to your Manager')
        }
        if (signInResult.status === 'shouldChangePassword') {    
          setToken(signInResult.token)
          setShowShouldChangePassword(true) 
          setInProgress(false)
          return
        }
        throw new Error(signInResult.message)
      }

      const setCookieExpirationTime = signInResult.user.Can_Be_Remembered === 'Yes' ? rememberMeRef.current.checked : false
      const setCookieResult = setCookie('token', signInResult.token, setCookieExpirationTime)
      if (setCookieResult.status !== 'ok') {
        throw new Error(setCookieResult.message)
      }         
      
      setAppContext({
        ...getAppContext,
        user: {
          ...signInResult.user
        }
      })

      navigate(signInResult.user.Home_Page)
      setFormError('')
      
    } catch (error) {
      setFormError(error.message)
      setInProgress(false)
    }
  }

  return (
    <>      
      <Grid container direction="row" justifyContent="center" alignItems="center" style={{height: "100vh"}}>
          <Paper className={styles.wrapper}>
            <img src={logo} alt={appName} className={styles.logo} />
            <FormGroup>
              <TextField error={emailError ? true : false} fullWidth label="Email address" type="text" inputRef={emailRef} />
              { emailError ? <InputAlert message={emailError} /> : ''}              
            </FormGroup>
            <FormGroup>
              <TextField error={passwordError ? true : false} fullWidth label="Password" type="password" inputRef={passwordRef} />
              { passwordError ? <InputAlert message={passwordError} /> : ''}              
            </FormGroup>
            <FormGroup>
              <Stack direction='row' justifyContent='space-between' alignItems='top'>
                <FormControlLabel control={<Checkbox style={{fontsize: '0.5rem'}} inputRef={rememberMeRef} />} label="Remember me" />
                <Button variant='text' size='small' style={{fontSize: '0.8rem'}} onClick={() => setShowForgotPassword(true)}>Forgot Password ?</Button>
              </Stack>
            </FormGroup>
            <FormGroup>
              <LoadingButton onClick={handleFormSubmit} loading={inProgress} {...btnOk()} >
                Sign in
              </LoadingButton>            
            </FormGroup>
            { formError ? <FormGroup><FormAlert message={formError} /></FormGroup> : ''}
          </Paper>
      </Grid>

      { showShouldChangePassword ? 
        <ChangePassword 
          openStateControllers = {{showShouldChangePassword, setShowShouldChangePassword}}
          requireCurrentPassword = {false}
          rememberMe = {rememberMeRef.current.checked}
          token = {token}
          redirectTo = {homePage}
        />
        :
        ''
      }

      { showForgotPassword ? 
        <ForgotPassword openStateControllers={{showForgotPassword, setShowForgotPassword}} />
        :
        ''
      }
    </>    
  )
}

export default SignIn