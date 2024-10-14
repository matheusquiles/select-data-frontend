import React, { useState } from 'react';
import * as F from '../styles/frame.jsx';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './sideBar.js';
import Header from './header.js';

const Frame = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <F.FrameWrapper>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
          <Header />
          <Sidebar setActiveComponent={setActiveComponent} /> 
        </Box>
      </CssVarsProvider>

      <div style={{ flex: 1 }}>
        <F.Content>
          {activeComponent || <div>Selecione um componente</div>} {/* Mensagem padrão */}
        </F.Content>
      </div>
    </F.FrameWrapper>
  );
};

export default Frame;
