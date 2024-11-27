import React from 'react'

import LOGO from "../assets/images/logo.png";

const NavBar = () => {
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={LOGO} alt="globify" className="h-11" />
    </div>
  )
}

export default NavBar;