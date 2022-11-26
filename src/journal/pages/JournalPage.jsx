
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {

  const dispatch = useDispatch();
  
  const onClickNewNote = () =>{
    dispatch( startNewNote());
  }
  const { isSaving, active: note } = useSelector( state => state.journal );
  
  

  
  
  return (
    <JournalLayout>

    { (!!note) ? <NoteView/> : <NothingSelectedView /> }

      {/* <NothingSelectedView /> */}

      {/* <NoteView/> */}
      <IconButton
      onClick={ onClickNewNote } 
      disabled={ isSaving }
      size='large'
      sx={{
        color:'white',
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity: 0.9},
        position: 'fixed',
        right: 50,
        bottom: 50
      }}
      >
      <AddOutlined sx={{fontSize: 30}}/>

      </IconButton>
      
    </JournalLayout>
    
  )
}
