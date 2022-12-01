import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { DeleteOutline, SaveAltOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { setActiveNote, startDeletingNote, startLoadingFiles, startSavingNote } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
  const dispatch = useDispatch();

  const { active:note,savedMessage, isSaving } = useSelector( state => state.journal);
  const { body, title, date, onInputChange, formState } = useForm( note );
   
  const dateString = useMemo(() =>{
   const newDate = new Date( date );
   return newDate.toUTCString();

  }, [date]);
  //? useRef
  const fileInputRef = useRef();


  useEffect(()=>{
    dispatch( setActiveNote( formState) );
  }, [formState])
//? I used sweetalert2 to create beautifuls alerts,https://sweetalert2.github.io/#download
  useEffect(() =>{

    if( savedMessage.length > 0 ) {
      Swal.fire( 'Updated note', savedMessage, 'success')
    }

  }, [savedMessage])
//! On save note
  const onSaveNote = () =>{
    dispatch( startSavingNote())
  }
  
  const onFileInputChange = ({ target }) => {
    if (target.files === 0 ) return;

    dispatch ( startLoadingFiles ( target.files))
  }
  //! On Delete
  const onDelete = () =>{
    dispatch(startDeletingNote());
  }

  return (
   <Grid 
   className='animate__animated animate__fadeIn animate__faster'
   container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}>
   <Grid item>
    <Typography fontSize={25} fontWeight='light'> { dateString }</Typography>
   </Grid>
   <Grid item>
   {/* Input to select many items from react */}
   <input 
   type='file' 
   multiple
    onChange={ onFileInputChange }
    style={{ display:' none'}}
    ref={ fileInputRef }
   />

   <IconButton
     color="primary"
     disabled={ isSaving }
     onClick={ () => fileInputRef.current.click() }
   > 
     <UploadOutlined />
   </IconButton>
   {/* end */}
    <Button color='primary' 
    disabled={isSaving}
    sx={{ padding: 2}}
    onClick={ onSaveNote }
    >
      <SaveAltOutlined sx={{fontSize: 30, mr:1}}/>
      Save
    </Button>
   </Grid>

   <Grid container>
   <TextField
    type='text'
    variant='filled'
    fullWidth
    placeholder='Enter a title'
    label='Title'
    sx={{border: 'none', mb: 1}}
    name="title"
    value={title}
    onChange={onInputChange}
   />

<TextField
    type='text'
    variant='filled'
    fullWidth
    multiline
    placeholder='What happen today?'
    minRows={5}
    name="body"
    value={body}
    onChange={onInputChange}
   />

   </Grid>

   <Grid container justifyContent='end'>
   <Button
    onClick={onDelete}
    sx={{mt:2}}
    color="error"
    >
    <DeleteOutline />
      
   </Button>

   </Grid>
   {/* Image Gallery */}
   <ImageGallery images = {note.imageUrls }/>


   </Grid>
  )
}
