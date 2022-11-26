import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";


export const startNewNote = () =>{

    return async ( dispatch, getState ) => {
     //getState is a function that contain everything (state) in your app
        
       dispatch ( savingNewNote() );

       const  { uid } = getState().auth;

        const newNote = {

            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( firebaseDB, `${ uid}/journal/notes`) );
         await setDoc( newDoc, newNote);

         newNote.id = newDoc.id;
        

        //! dispatch
        dispatch( addNewEmptyNote( newNote) );
        dispatch( setActiveNote( newNote) );
        

        

    }
}

 export const startLoadingNotes = () => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        if (!uid ) throw new Error ( 'User Id does not exist!');

        const notes = await loadNotes ( uid );
        dispatch( setNotes( notes) );
    }
 }

 export const startSavingNote = () =>{
    return async (dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteTofireStore = { ...note };
        delete noteTofireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( docRef, noteTofireStore, { merge:true });

        dispatch( updateNote( note ) );

    }
 }