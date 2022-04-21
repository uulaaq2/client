import React, { useState, useRef, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppWrapper'
import { getCookie, setCookie } from '../../functions/cookie'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)

const Home = () => {
  const getAppContext = useAppContext().getAppContext
  const setAppContext = useAppContext().setAppContext
  const navigate = useNavigate()

  useEffect(() => {    
    if (!getCookie('token').value) {
      navigate('/signin')
    }
  }, [])

  function handleRedirect() {
    navigate('/drawings')
  }

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, marginTop: '5%', marginLeft: '5%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          LOOP PDF's
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' onClick={handleRedirect}>Get list of Loop Pdf's</Button>
      </CardActions>
    </Card>
  )
}

export default Home;