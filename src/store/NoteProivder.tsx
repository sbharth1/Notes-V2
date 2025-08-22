import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {getAllNote, Note} from '../database/userQueries';
import {initDB} from '../database';
import {noteType} from '../types/note';

const AuthContext = createContext<noteType | null>(null);

export const AuthProvider = ({children}: any) => {
  const [allnote, setAllNote] = useState<Note[]>([]);
  const [cardData, setCardData] = useState<Note[]>([]);
  const [filteredCardData, setFilteredCardData] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [singleUserData, setSingleUserData] = useState<Note[] | null>(null);
  const [singleUserDataEdit, setSingleUserDataEdit] = useState<Note[] | null>(null);
  const [headModal, setHeadModal] = useState<string>('Add Modal');
  
  const hideModal = useCallback(() => setVisible(false), []);

  const addNewNote = useCallback((note: Note) => {
    setAllNote(prev => [note, ...prev]);
    setCardData(prev => [note, ...prev]);
    setFilteredCardData(prev => [note, ...prev]);
  }, []);

  const refreshAllNotes = useCallback(async () => {
    try {
      const db = await initDB();
      const notes = await getAllNote(db);
      setAllNote(notes);
      setCardData(notes);
      setFilteredCardData(notes);
    } catch (e) {
      console.error('DB error:', e);
    }
  }, []);

  useEffect(() => {
    refreshAllNotes();
  }, [refreshAllNotes]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCardData(cardData);
    } else {
      const filtered = cardData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCardData(filtered);
    }
  }, [searchQuery, cardData]);

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
        filteredCardData,
        setFilteredCardData,
        searchQuery,
        setSearchQuery,
        addNewNote,
        setSingleUserDataEdit,
        singleUserDataEdit,
        refreshAllNotes,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useNoteProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useNoteProvider must be used within an AuthProvider');
  }
  return context;
};
