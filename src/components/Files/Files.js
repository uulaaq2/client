import styles from './styles.module.css'
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
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
import { LoadingButton } from '@mui/lab'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material'

import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'

import config from '../../config'

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial"
  }
});

export default function Files() {
  const [list, setList] = useState([])
  const [inProgress, setInProgress] = useState(false)  
  const [searchNoResult, setSearchNoResult] = useState('')
  const searchRef = useRef()
  const classes = useStyles()
  
  useEffect(() => {
    searchRef.current.focus()
  }, [])

  async function handleGetList() {
      setInProgress(true)
      setSearchNoResult('')
      const getDrawingsResult = await getDrawings(searchRef.current.value.replace(/ /g,""))
      if (getDrawingsResult.status === 'ok') {
        setList(getDrawingsResult.results)
      } else {
        setSearchNoResult('No files found')
        setList([])        
      }

      setInProgress(false)
 }

  function handlePreview(fileName) {
    const newWindow = window.open(config.api.urls.server + '/' + fileName, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  if (inProgress) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={inProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
  return (
    <div>
        <Stack flexDirection='column' gap='1rem' className={styles.container} margin='2% auto'>
          <Typography variant="h5">Loop Pdfs</Typography>
          <Stack backgroundColor='white' flexDirection='row' padding='4px 6px'>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search keyword in file names"
              inputProps={{ 'aria-label': 'search loop pdfs' }}
              inputRef={searchRef}      
            />
            { !inProgress ?
              <LoadingButton variant='text' endIcon={<SearchIcon />} onClick={handleGetList}>
                { !inProgress ? 'Search' : 'Please Wait...'}
              </LoadingButton>            
              :
              <CircularProgress color="inherit" size="1rem"/>
            }
          </Stack>
        <Stack direction="row" spacing={1} marginTop='-10px'>        
          { inProgress ?
            <Stack alignItems='center' justifyContent='center' width='100%'>
              <CircularProgress color="inherit" size="1rem"/>
            </Stack>
            :
            <Stack justifyContent='space-between' flexDirection='row' className={styles.container} >
              <Chip label="To get all files, search without any keywords" variant="outlined" size='small' style={{ border: 'none'}} />
              { list.length > 0 ? 
                <strong><Chip label={`${list.length} files found`} variant="outlined" size='small' style={{border: 'none'}} /></strong>
                : 
                '' 
              }
            </Stack>
          }
          
        </Stack>
        { searchNoResult ? 
            <Stack direction="row" spacing={1} marginTop='-10px'>
              <Chip label={searchNoResult} color="primary" size='small' icon={<PriorityHighIcon />} />
            </Stack>
          : 
          ''
        }

          <Paper elevation={0}>
          
          <TableContainer component={Paper} classes={{ root: classes.customTableContainer }} elevation={0} className={styles.container} style={{overflow: 'auto'}}>
          <Table
            sx={{
              minWidth: 650,
              "& .MuiTableRow-root:hover": {
                backgroundColor: "#efefef"
              }
            }}
            aria-label="simple table"
            stickyHeader={true}
            elevation={0}         
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
              {list.map((e, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }}}           
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
      </Stack>

   </div>
  );
}