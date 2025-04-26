import React, {createContext, useContext, useEffect, useState} from 'react';
import {noteType} from '../types/note';
import {getAllNote, Note} from '../database/userQueries';
import {initDB} from '../database';

const AuthContext = createContext<noteType>(null);

export const AuthProvider = ({children}: any) => {
  const [allnote, setAllNote] = useState<Note[]>([]);
  const [cardData, setCardData] = useState<Note[]>([]);
  const [visible, setVisible] = useState(false);
  const [singleUserData, setSingleUserData] = useState<Note[] | null>(null);
  const [headModal, setHeadModal] = useState<string>('Add Modal');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const hideModal = () => setVisible(false);

  const addNewNote = (note: Note) => {
    setAllNote(prev => [note, ...prev]);
    setCardData(prev => [note, ...prev]);
  };

  //   to get all notes
  useEffect(() => {
    const run = async () => {
      try {
        const db = await initDB();
        const notes = await getAllNote(db);
        setAllNote(notes);
        console.log(notes, '--notes--');
      } catch (e) {
        console.error('--- db error', e);
      }
    };
    run();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        allnote,
        visible,
        hideModal,
        setVisible,
        setHeadModal,
        headModal,
        singleUserData,
        setSingleUserData,
        cardData,
        setCardData,
        darkMode,
        setDarkMode,
        addNewNote,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useNoteProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
