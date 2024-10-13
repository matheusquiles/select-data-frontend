import React, { useState } from 'react';
import * as F from '../styles/frame.jsx';
import { CssVarsProvider } from '@mui/joy/styles';
import Sidebar from './sideBar.js';
import Header from './header.js';

const Frame = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <F.FrameWrapper>
      <CssVarsProvider disableTransitionOnChange>
        <Sidebar setActiveComponent={setActiveComponent} /> {/* Passar a função como prop */}
      </CssVarsProvider>
      <div style={{ flex: 1 }}>
        <Header />
        <F.Content>
          {activeComponent || <div>Selecione um componente</div>} {/* Mensagem padrão */}
        </F.Content>
      </div>
    </F.FrameWrapper>
  );
};

export default Frame;
