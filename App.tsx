import React from 'react';
import Home from './src/pages/Home';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
      <PaperProvider>
        <Home />
      </PaperProvider>
  );
};

export default App;
