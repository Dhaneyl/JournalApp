import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
 name: 'journal',
 initialState: {
   isSaving: false,
   savedMessage: '',
   notes:[],
//    active: {
//     id: 'ABC123',
//     title: '',
//     body: '',
//     date: 1234567,
//     imageUrls: [],

//    }
   active: null,
    

},
  reducers: {
   savingNewNote: ( state ) => {

      state.isSaving = true;
   },

   addNewEmptyNote: (state, action) =>{
      //We can use .push and mutting the state cuz we are using redux toolkit and it has the immer library
      state.notes.push( action.payload );
      state.isSaving = false;

   },
   setActiveNote: (state, action )=>{
      state.active = action.payload;
      state.savedMessage = '';


   },
   setNotes: (state, action) =>{
      state.notes = action.payload;
   },
   setSaving: (state) =>{
      state.isSaving = true;
      state.savedMessage = ''
      // TODO: error message

   },
   updateNote: (state, action) =>{
      state.isSaving = false;
      state.notes = state.notes.map( note =>{

         if( note.id === action.payload.id){
            return action.payload;
         }

         return note;
      })

      // TODO: show updated message
      state.savedMessage = `${ action.payload.title }, correctly updated!`;
   },
   setPhotosToActiveNote: ( state, action) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;

   },
   clearNotesLogout:(state) =>{ 
      state.isSaving = false;
      state.savedMessage = '';
      state.notes = [];
      state.active = null;

   },
   deleteteNoteById: (state, action) =>{
     state.active = null;
     state.notes = state.notes.filter( note => note.id !== action.payload );
},

 
 }
 
});



// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteteNoteById, savingNewNote, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions;