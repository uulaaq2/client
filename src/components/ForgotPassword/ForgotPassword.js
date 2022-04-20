import React, { useState, useEffect, useRef } from 'react'
import InputAlert from '../Alerts/InputAlert'
import FormAlert from '../Alerts/FormAlert'
import validateInputFields from '../../functions/validateInputFields'
import { btnDialogOk, btnDialogSuccess, btnDialogClose } from '../../themes/buttonVariants'
import getPasswordResetLink from '../../functions/user/me/getPasswordResetLink'

import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button, Paper, FormGroup, TextField, FormControlLabel, Checkbox, Zoom, Box, Grow, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline, ConstructionOutlined, PasswordOutlined } from '@mui/icons-material'
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {

  return <Zoom in={true} ref={ref} {...props} />
});

const ForgotPassword = ({ title = 'Forgot password', openStateControllers }) => {  
  const emailRef = useRef(null)
  const [emailError, setEmailError] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [erroredInputFields, setErroredInputFields] = useState([])
  const [formError, setFormError] = useState('')
  const [showEmailIsSent, setShowEmailIsSent] = useState(false)

  const formInputs = {
    email: {    
      validate: true,
      name: 'Email address',
      required: true,
      ref: emailRef,
      setErrorText: function(errorText) {
        setEmailError(errorText)
      }
    },
    setErroredInputFields: function(erroredInputFields) {
      setErroredInputFields([...erroredInputFields])
    }
  }


  useEffect(() => {    
    if (erroredInputFields.length === 0) return
    
    erroredInputFields[0].focus()
  }, [erroredInputFields])

  async function handleSubmit() {
    setTimeout(() => {
      
    }, 500);
    try {

      setInProgress(true)
      const validateInputFieldsResult = validateInputFields(formInputs)
      if (validateInputFieldsResult.status !== 'ok') {
        setInProgress(false)
        return
      }      

      const emailAddress = emailRef.current.value
      const getPasswordResetLinkResult = await getPasswordResetLink(emailAddress)
      if (getPasswordResetLinkResult.status !== 'ok') {
        throw new Error(getPasswordResetLinkResult.message)
      }
      
      //setFormError('')
      setShowEmailIsSent(true)
    } catch (error) {      
      if (formError !== error.message) {
        console.log('aaa')
        setFormError(error.message)
      }
      setInProgress(false)
    }
  }



    return (
      <Dialog
        open={openStateControllers.showForgotPassword}
        onClose={() => openStateControllers.setShowForgotPassword(false)}
        TransitionComponent={Transition} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
  
        fullWidth          
      >
        { showEmailIsSent ? 
          <EmailIsSent openStateControllers={openStateControllers} />
          :
          <Stack spacing={2}>
            <DialogTitle id="alert-dialog-title">
              {title}
            </DialogTitle>
            <DialogContent>
              <Stack gap='0.5rem'>    
                <FormGroup style={{marginTop: "0.7rem"}}>
                  <TextField error={emailError ? true : false} fullWidth label={formInputs.email.name} type='email' inputRef={emailRef} />
                  { emailError ? <InputAlert message={emailError} /> : ''}              
                </FormGroup>

                <FormGroup>
                  { formError ? <FormAlert message={formError} /> : '' }
                </FormGroup>
        
              </Stack>
            </DialogContent>
            <DialogActions style={{marginBottom: '0.5rem'}}>
              <Button onClick={() => openStateControllers.setShowForgotPassword(false)} {...btnDialogClose()} disabled={inProgress}>
                Close
              </Button>
              <LoadingButton onClick={handleSubmit} loading={inProgress} {...btnDialogOk()} >
                Email reset password link
              </LoadingButton>   
            </DialogActions>
          </Stack>
        }
      </Dialog>
    )    
}

const EmailIsSent = ({ openStateControllers }) => {    
  return (
    <Typography component="div">
      <Box sx={{ width: '100%'}}>
        <Grow in={true}>
          <Stack spacing={5} alignItems="center" justifyContent="center" style={{padding: "2rem"}}>
            <CheckCircleOutline color="success" style={{fontSize: "3rem"}} />
            <Box sx={{ fontSize: 'h6.fontSize', m: 1, textAlign: 'center' }}>
              Password reset link has been emailed to your email address
            </Box>
            <Box sx={{ fontSize: '0.9rem', m: 1, textAlign: 'center' }} justifyContent='center' alignItems='center'>
              Please also check your <strong>email <DoDisturbOutlinedIcon /> Junk</strong> folder
            </Box>
            <Button {...btnDialogClose()} onClick={() => openStateControllers.setShowForgotPassword(false)}>
              Close
            </Button>
          </Stack>
        </Grow>
      </Box>
    </Typography>
  )
}

export default ForgotPassword