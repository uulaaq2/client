import React from 'react'
import { Box, Grow, Chip } from "@mui/material"
import { red } from '@mui/material/colors'
import FormHelperText from "@mui/material/FormHelperText"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const InputAlert = ({ message }) => {
  return (
    <Box>
      <Grow  in={true}>
        <Chip icon={<ErrorOutlineIcon />} label={message} variant="outlined" color="error" size="small" style={{border: "0", padding: "0", margin: "0"}}/>
      </Grow>
    </Box>
  );
}

export default InputAlert