import React from 'react';
import Home from './src/pages/Home';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <>
      <Provider>
        <Home />
      </Provider>
    </>
  );
};

export default App;
