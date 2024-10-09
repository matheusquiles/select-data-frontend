import React, { useState } from 'react';
import * as F from '../styles/frame.jsx';
import CadastroProcesso from '../CadastroProcesso';
import ConsultarProcesso from '../Processos';

const Frame = ({ children }) => {
  const [openSubMenu, setOpenSubMenu] = useState('');
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? '' : menu);
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <F.FrameWrapper>
      <F.Sidebar>
        <F.Logo src="/images/logo.png" alt="Logo" />
        <F.MenuItem onClick={() => toggleSubMenu('processos')}>
          Processos
          <F.SubMenu isOpen={openSubMenu === 'processos'}>
          <F.SubMenuItem onClick={() => handleMenuClick(<CadastroProcesso />)}>Novo</F.SubMenuItem>
          <F.SubMenuItem onClick={() => handleMenuClick(<ConsultarProcesso/>)}>Consultar</F.SubMenuItem>
          </F.SubMenu>
        </F.MenuItem>
        <F.MenuItem onClick={() => toggleSubMenu('manutencao')}>
          Manutenção
          <F.SubMenu isOpen={openSubMenu === 'manutencao'}>
            <F.SubMenuItem>
              <div onClick={() => toggleSubMenu('escritorio')}>Escritório</div>
              <F.SubMenu isOpen={openSubMenu === 'escritorio'}>
                <F.SubMenuItem>Novo</F.SubMenuItem>
                <F.SubMenuItem>Consultar</F.SubMenuItem>
              </F.SubMenu>
            </F.SubMenuItem>
            <F.SubMenuItem>
              <div onClick={() => toggleSubMenu('reu')}>Réu</div>
              <F.SubMenu isOpen={openSubMenu === 'reu'}>
                <F.SubMenuItem>Novo</F.SubMenuItem>
                <F.SubMenuItem>Consultar</F.SubMenuItem>
              </F.SubMenu>
            </F.SubMenuItem>
            <F.SubMenuItem>
              <div onClick={() => toggleSubMenu('funcao')}>Função</div>
              <F.SubMenu isOpen={openSubMenu === 'funcao'}>
                <F.SubMenuItem>Novo</F.SubMenuItem>
                <F.SubMenuItem>Consultar</F.SubMenuItem>
              </F.SubMenu>
            </F.SubMenuItem>
            <F.SubMenuItem>
              <div onClick={() => toggleSubMenu('tribunal')}>Tribunal</div>
              <F.SubMenu isOpen={openSubMenu === 'tribunal'}>
                <F.SubMenuItem>Novo</F.SubMenuItem>
                <F.SubMenuItem>Consultar</F.SubMenuItem>
              </F.SubMenu>
            </F.SubMenuItem>
            <F.SubMenuItem>
              <div onClick={() => toggleSubMenu('vara')}>Vara</div>
              <F.SubMenu isOpen={openSubMenu === 'vara'}>
                <F.SubMenuItem>Novo</F.SubMenuItem>
                <F.SubMenuItem>Consultar</F.SubMenuItem>
              </F.SubMenu>
            </F.SubMenuItem>
          </F.SubMenu>
        </F.MenuItem>
        <F.MenuItem onClick={() => toggleSubMenu('sobre')}>
          Sobre
        </F.MenuItem>
      </F.Sidebar>
      <div style={{ flex: 1 }}>
        <F.Header />
        <F.Content>
          {activeComponent || children}
        </F.Content>
        <F.Footer>
          <p>© 2024 Shopia Softwares</p>
        </F.Footer>
      </div>
    </F.FrameWrapper>
  );
};

export default Frame;