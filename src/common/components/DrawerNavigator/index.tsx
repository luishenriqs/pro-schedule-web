import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function DrawerNavigator() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        {/* Conteúdo do drawer */}
        <div style={{ width: '40vw' }}> {/* Defina o tamanho desejado para o drawer */}
          {/* Seu conteúdo do drawer aqui */}
        </div>
      </Drawer>
    </>
  );
}

export default DrawerNavigator;
