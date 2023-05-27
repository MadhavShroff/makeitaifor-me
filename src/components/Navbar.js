// Navbar.js
import React from 'react';
import ResponsiveImage from '@/components/ResponsiveImage';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1em',
      backgroundColor: 'white',
      color: 'black',
      zIndex: 1,
      height: '60vh',  // Change height to be 60% of the viewport height
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <ResponsiveImage
          src="/logo.png" // logo is stored in the /public directory
          alt="Logo"
        />
      </div>
      <div>Navbar content goes here</div>
    </nav>
  );
};

export default Navbar;