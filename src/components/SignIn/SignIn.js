import styles from './styles.module.css'
import React, { useState, useRef, useEffect } from 'react'
import config from '../../config'
import logo from '../../images/logo.png'
import { btnOk } from '../../themes/buttonVariants'
import validateInputFields from '../../functions/validateInputFields'
import signIn from '../../functions/signIn/signIn'

import InputAlert from '../Alerts/InputAlert'
import FormAlert from '../Alerts/FormAlert'
import AppAlert from '../Alerts/AppAlert'

import { Grid, Paper, FormGroup, TextField, FormControlLabel, Checkbox } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const SignIn = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const rememberMeRef = useRef(null)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [appError, setAppError] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [erroredInputFields, setErroredInputFields] = useState([])

  const signinlink = config.api.urls.signin  
  const homePage = config.urls.home
  const appName = config.app.name

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
      const validateInputFieldsResult = validateInputFields(formInputs)
      if (validateInputFieldsResult.status !== 'ok') return
      
      const emailAddress = formInputs.email.ref.current.value
      const password = formInputs.password.ref.current.value
      const rememberMe = formInputs.rememberMe.ref.current.checked
  
      const signInResult = await signIn(emailAddress, password, rememberMe)
  
      console.log('signin Result', signInResult)      
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
              <FormControlLabel control={<Checkbox ref={rememberMeRef} />} label="Remember me" />
            </FormGroup>
            <FormGroup>
              <LoadingButton onClick={handleFormSubmit} loading={inProgress} {...btnOk()} >
                Sign in
              </LoadingButton>            
            </FormGroup>
          </Paper>
        </Grid>
  )
}

export default SignIn