import Navbar from './Navbar';
import Content from './Content';
import {initDB} from '../database';
import {addNote, getAllNote, Note} from '../database/userQueries';
import {useEffect, useState} from 'react';

const Home = () => {
  const [allnote, setAllNote] = useState<Note[]>([]);

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
    <>
      <Navbar />
      <Content allnote={allnote} />
    </>
  );
};

export default Home;
