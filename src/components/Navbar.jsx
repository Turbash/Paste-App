import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-8 rounded-lg shadow-lg">
      <div className="flex justify-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-gray-300 hover:text-white'
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar