import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="bg-gray-800 flex items-center justify-between p-4">
      <Link to="/" className="text-white text-2xl">MealSearch</Link>
      <div className='flex gap-4 items-center'>
        <NavLink to="/" className={({isActive}) => isActive ? 'text-indigo-600 p-2' : 'text-white p-2'}>Home</NavLink>
        <NavLink to="/ingredients" className={({isActive}) => isActive ? 'text-indigo-600 p-2' : 'text-white p-2'}>Ingredients</NavLink>
      </div>
    </nav>
  )
}
