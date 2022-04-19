import React, { useEffect, useState } from 'react'
import { Box, Collapse, Alert, AlertTitle, IconButton,
        Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Zoom } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {

  return <Zoom in={true} ref={ref} {...props} />
});

const FormErrorAlert = ({message = ''}) => {
  const [open, setOpen] = useState(true)
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition} 
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" color="error">
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
};

export default FormErrorAlert;