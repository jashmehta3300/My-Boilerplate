import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

// import Cookies from 'js-cookie';

function App() {
  
  return (
    <Provider store={store}>
    <div className="App">
      Hello World
    </div>
    </Provider>
  );
}

export default App;
