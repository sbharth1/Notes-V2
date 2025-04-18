import Navbar from './Navbar';
// import Content from './Content';
import { initDB } from '../database';
import { addNote, getAllNote } from '../database/userQueries';
import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

const Home = () => {
  useEffect(() => {
    const run = async () => {
      try {
        const db = await initDB();
        await addNote(db, 'John', 'Sample Note', 'This is a note');
        const notes = await getAllNote(db);
        console.log('----Notes:', notes);
      } catch (e) {
        console.error('--- db error', e);
      }
    };
  
    run();
  }, []);
  
  return (
    <>
      <Navbar />

      <View>
      <Text>Notes Loaded (check console)</Text>
    </View>
        {/* <Content /> */}
    </>
  );
};

export default Home;
