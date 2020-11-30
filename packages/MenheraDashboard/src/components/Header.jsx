import React from 'react';

import logo from '../assets/Logo.png';
import '../styles/header.css';

const Header = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="Logo" width="100" className="icon" />
      </header>
    </div>
  );
};

export default Header;
