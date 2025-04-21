import React, { createContext, useContext, useEffect, useState } from 'react';
import { noteType } from '../types/note';
import { getAllNote, Note } from '../database/userQueries';
import { initDB } from '../database';

const AuthContext = createContext<noteType>(null);

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState<number>(50000);
  const [allnote, setAllNote] = useState<Note[]>([]);

//   to get all notes 
  useEffect(() => {
    const run = async () => {
      try {
        const db = await initDB();
        const notes = await getAllNote(db);
        setAllNote(notes);
        console.log(notes)
      } catch (e) {
        console.error('--- db error', e);
      }
    };
    run();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser,allnote }}>
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

