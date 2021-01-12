import React from 'react';
import StockSelection from "./components/StockSelection";

import {Provider} from 'react-redux'
import store from "./store";

function App(){
  return (
      <Provider store={store}>
          <div className="App">
              <StockSelection />
          </div>
      </Provider>
  );
}

export default App;
