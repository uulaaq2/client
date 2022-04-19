import React from 'react'
import { Box, Collapse, Alert, AlertTitle, Grow } from "@mui/material"

const FormAlert = ({ message }) => {
  return (
    <Box>
      <Grow in={true}>
        <Alert severity="error">
          {message}
        </Alert>
      </Grow>
    </Box>
  );
}

export default FormAlert