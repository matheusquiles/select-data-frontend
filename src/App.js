import React from 'react';
import { Provider } from 'react-redux'; // Importa o Provider
import store from './redux/store'; // Importa a store
import Frame from './components/frame.js';
import './CadastroProcesso.css';
import Home from './components/home.js';

function App() {
  return (
    <Provider store={store}> {/* Envolve a aplicação com o Provider */}
      <Frame>
        <Home />
      </Frame>
    </Provider>
  );
}

export default App;
