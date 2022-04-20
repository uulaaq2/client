import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCookie} from '../../functions/cookie'
import { useAppContext } from '../../context/AppWrapper'
import InputAlert from '../Alerts/InputAlert'
import FormAlert from '../Alerts/FormAlert'
import validateInputFields from '../../functions/validateInputFields'
import { btnDialogOk, btnDialogSuccess, btnDialogClose } from '../../themes/buttonVariants'
import verifyPassword from '../../functions/user/me/verifyPassword'
import changePassword from '../../functions/user/me/changePassword'
import config from '../../config'

import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Paper, FormGroup, TextField, FormControlLabel, Checkbox, Zoom, Box, Grow, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline, ConstructionOutlined, PasswordOutlined } from '@mui/icons-material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {

  return <Zoom in={true} ref={ref} {...props} />
});

const ChangePassword = ({ title = 'Change your password', openStateControllers, requireCurrentPassword = true, rememberMe = false, redirectTo = null, token = null}) => {  
  const currentPasswordRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [erroredInputFields, setErroredInputFields] = useState([])
  const [formError, setFormError] = useState('')
  const [showPasswordIsChanged, setShowPasswordIsChanged] = useState(false)
  const navigate = useNavigate()
  const getAppContext = useAppContext().getAppContext
  const setAppContext = useAppContext().setAppContext

  let currentPasswordInputGroup = {}
  if (requireCurrentPassword) {
    currentPasswordInputGroup = {
      currentPassword :{
        validate: true,
        name: 'Current password',
        required: true,
        ref: currentPasswordRef,
        setErrorText: function(errorText) {
          setCurrentPasswordError(errorText)
        }
      }
    }
  }

  const formInputs = {
    ...currentPasswordInputGroup,
    password: {    
      validate: true,
      name: 'New Password',
      required: true,
      ref: passwordRef,
      setErrorText: function(errorText) {
        setPasswordError(errorText)
      }
    },
    confirmPassword: {    
      validate: true,
      name: 'Confirm new password',
      required: true,
      ref: confirmPasswordRef,
      match: passwordRef,
      matchLabel: 'New password',
      setErrorText: function(errorText) {
        setConfirmPasswordError(errorText)
      }
    },
    setErroredInputFields: function(erroredInputFields) {
      setErroredInputFields([...erroredInputFields])
    }
  }

  useEffect(() => {
   console.log('token ', token)
    return
    if (requireCurrentPassword) {
      currentPasswordRef.current.focus()
    } else {
      passwordRef.current.focus()
    }
  }, [])

  useEffect(() => {    
    if (erroredInputFields.length === 0) return
    
    erroredInputFields[0].focus()
  }, [erroredInputFields])

  async function handleSubmit() {
    try {

      setInProgress(true)
      const validateInputFieldsResult = validateInputFields(formInputs)
      if (validateInputFieldsResult.status !== 'ok') {
        setInProgress(false)
        return
      }      

      let currentPassword = ''
      if (requireCurrentPassword) {
        currentPassword = currentPasswordRef.current.value
      }
      const password = passwordRef.current.value
      const confirmPassword = confirmPasswordRef.current.ref

      if (requireCurrentPassword) {
        const verifyPasswordResult = await verifyPassword(currentPassword, token)
        if (verifyPasswordResult.status !== 'ok') {
          if (verifyPasswordResult.status === 'warning') {
            setCurrentPasswordError('Invalid password')
          } else {
            throw new Error(verifyPasswordResult.message)
          }          
          
          setInProgress(false)
          return
        }
      }
      const changePasswordResult = await changePassword(passwordRef.current.value, token)
      if (changePasswordResult.status !== 'ok') {
        throw new Error(changePasswordResult.message)
      }
      
      const setCookieResult = setCookie('token', token, rememberMe)
      if (setCookieResult.status !== 'ok') {
        throw new Error(setCookieResult.message)
      }

      setShowPasswordIsChanged(true)
    } catch (error) {
      setFormError(error.message)
      setInProgress(false)
    }
  }



    return (
      <Dialog
        open={openStateControllers.showShouldChangePassword}
        onClose={() => openStateControllers.setShowShouldChangePassword(false)}
        TransitionComponent={Transition} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
  
        fullWidth          
      >
        {showPasswordIsChanged ? 
          <PasswordIsChanged countDownFrom={10} redirectPage={redirectTo} />
          :
          <Stack spacing={2}>
            <DialogTitle id="alert-dialog-title">
              {title}
            </DialogTitle>
            <DialogContent>
              <Stack>
                { requireCurrentPassword ? 
                  <FormGroup style={{marginTop: "0.7rem"}}>
                    <TextField error={currentPasswordError ? true : false} fullWidth label={formInputs.currentPassword.name} type='password' inputRef={currentPasswordRef} />
                    { currentPasswordError ? <InputAlert message={currentPasswordError} /> : ''}              
                  </FormGroup>
                : ''
                }
    
                <FormGroup style={{marginTop: "0.7rem"}}>
                  <TextField error={passwordError ? true : false} fullWidth label={formInputs.password.name} type='password' inputRef={passwordRef} />
                  { passwordError ? <InputAlert message={passwordError} /> : ''}              
                </FormGroup>
    
                <FormGroup style={{marginTop: "0.7rem"}}>
                  <TextField error={confirmPasswordError ? true : false} fullWidth label={formInputs.confirmPassword.name} type='password' inputRef={confirmPasswordRef} />
                  { confirmPasswordError ? <InputAlert message={confirmPasswordError} /> : ''}             
                </FormGroup>
    
                <FormGroup>
                  { formError ? <FormAlert key={Date.now()} message={formError} /> : '' }
                </FormGroup>
              </Stack>
            </DialogContent>
            <DialogActions style={{marginBottom: '0.5rem'}}>
              <Button onClick={() => openStateControllers.setShowShouldChangePassword(false)} {...btnDialogClose()} disabled={inProgress}>
                Close
              </Button>
              <LoadingButton onClick={handleSubmit} loading={inProgress} {...btnDialogOk()} >
                Change password
              </LoadingButton>   
            </DialogActions>
          </Stack>
        }
      </Dialog>
    )    
}

const PasswordIsChanged = ({ countDownFrom = null, redirectTo = config.urls.home }) => {
  const [counter, setCounter] = useState(countDownFrom)
  const navigate = useNavigate()
  
  useEffect(() => {

  }, [])

  useEffect(() => {
    if (countDownFrom === null) return

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      handleRedirect()
    }
    return () => clearInterval(timer);    
  }, [counter]);

  function handleRedirect() {
    if (!redirectTo)  {
      navigate('/')
    } else {
      navigate(redirectTo.path)
    }
  }
  
  return (
    <Typography component="div">
      <Box sx={{ width: '100%'}}>
        <Grow in={true}>
          <Stack spacing={5} alignItems="center" justifyContent="center" style={{padding: "2rem"}}>
            <CheckCircleOutline color="success" style={{fontSize: "3rem"}} />
            <Box sx={{ fontSize: 'h5.fontSize', m: 1 }}>
              New password is set
            </Box>
            <Button {...btnDialogSuccess()} onClick={handleRedirect}>
              {`Go to ${redirectTo.name} PAGE ${counter}`}
            </Button>
          </Stack>
        </Grow>
      </Box>
    </Typography>
  )
}

export default ChangePassword