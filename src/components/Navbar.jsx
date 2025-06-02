import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaClipboard } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='max-w-4xl mx-auto p-6 flex justify-center gap-8 mb-8'>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 text-lg ${isActive ? 'text-accent-primary' : 'text-text-primary'} hover:text-accent-secondary`
        }>
        <FaHome className="text-xl" />
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `flex items-center gap-2 text-lg ${isActive ? 'text-accent-primary' : 'text-text-primary'} hover:text-accent-secondary`
        }>
        <FaClipboard className="text-xl" />
        Pastes
      </NavLink>
    </nav>
  )
}

export default Navbar