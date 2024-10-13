import React from 'react';
import { Provider } from 'react-redux'; 
import store from './redux/store';
import Frame from './components/frame.js';
import './CadastroProcesso.css';
import Home from './components/home.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <Frame>
        <Home />
      </Frame>
    </Provider>
  );
}

export default App;
