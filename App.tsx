import React from 'react';
import Home from './src/pages/Home';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </Provider>
  );
};

export default App;
