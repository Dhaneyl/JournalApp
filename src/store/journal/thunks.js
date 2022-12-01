import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


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

 export const startLoadingFiles =  ( files = []) => {
    return async( dispatch ) =>{
        dispatch( setSaving() );

    //    await fileUpload( files[0] );

    const fileUploadPromises = [];
    for ( const file of files){
        fileUploadPromises.push( fileUpload( file ))
    }
    const photosUrls = await  Promise.all( fileUploadPromises );
    dispatch( setPhotosToActiveNote(photosUrls));

    }

 }

 export const startDeletingNote = () =>{
    return async( dispatch, getState )=> {

        const { uid } =  getState().auth;
        const {active: note } = getState().journal;

        const docRef = doc( firebaseDB, `${ uid } /journal/notes/${note.id}`);
        const resp = await deleteDoc( docRef );

        dispatch( deleteteNoteById( note.id ));
    }
 }