import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='terminal-window flex justify-center gap-8 mb-8'>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-lg ${isActive ? 'text-terminal-green' : 'text-terminal-text'} hover:text-terminal-purple`
        }>
        $ Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `text-lg ${isActive ? 'text-terminal-green' : 'text-terminal-text'} hover:text-terminal-purple`
        }>
        $ Pastes
      </NavLink>
    </div>
  )
}

export default Navbar