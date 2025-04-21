import React from 'react';
import Home from './src/pages/Home';
import {PaperProvider} from 'react-native-paper';
import { AuthProvider } from './src/store/NoteProivder';
const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <Home />
      </PaperProvider>
      </AuthProvider>
  );
};

export default App;
