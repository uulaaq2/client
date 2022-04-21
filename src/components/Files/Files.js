import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Navigate } from 'react-router-dom';
import getDrawings from '../../functions/getDrawings'
import Link from '@mui/material/Link'
import { v4 as uuidv4 } from 'uuid'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { makeStyles } from '@mui/styles'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material'

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial"
  }
});

export default function Files() {
  const [list, setList] = useState([])
  const [inProgress, setInProgress] = useState(false)  
  const classes = useStyles()
  
  useEffect(() => {
    const a = async () => {
      setInProgress(true)
      const getDrawingsResult = await getDrawings()
      console.log(getDrawingsResult.results)
      setList(getDrawingsResult.results)
      setInProgress(false)
    }

    a()
  }, [])

  function handlePreview(fileName) {
    const newWindow = window.open('http://AUBOTD9X94HD2:3001/' + fileName, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  if (inProgress) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={inProgress}
>
        <Box gap='0.5rem' flexDirection='row' alignItems='center' justifyContent='center'>
          <CircularProgress color="inherit" />
          <Typography>Please wait while getting the file list ...</Typography>
        </Box>
      </Backdrop>
    )
  }
  return (
    <div>
      <Paper>
      <TableContainer component={Paper} classes={{ root: classes.customTableContainer }}>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableRow-root:hover": {
            backgroundColor: "#efefef"
          }
        }}
        aria-label="simple table"
        stickyHeader
        >
        <TableHead>
          <TableRow>
            <TableCell align="left">File Name</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Modified At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((e) => (
            <TableRow
              key={uuidv4()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}              
            >
              <TableCell align="left"><Link underline="none" style={{cursor: 'pointer'}}  onClick={() => handlePreview(e.File_Name, e.File_Extension)}>{e.File_Name}</Link></TableCell>
              <TableCell align="right"><IconButton color="primary" aria-label="upload picture" style={{cursor: 'pointer'}} component="span" onClick={() => handlePreview(e.File_Name, e.File_Extension)}>
                <ManageSearchIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">{new Date(e.Created_At).toDateString()}</TableCell>
              <TableCell align="right">{new Date(e.Modified_At).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  </div>
  );
}