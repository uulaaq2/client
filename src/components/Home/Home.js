import React, { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../../context/AppWrapper'

const Home = () => {
  const getAppContext = useAppContext().getAppContext
  const setAppContext = useAppContext().setAppContext


  return (
    <div>
      home
    </div>
  );
}

export default Home;