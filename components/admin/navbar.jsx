import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Navbar = ({ signOutUser }) => (
  <div>
    <div>Admin space</div>
    <Link to="/admin/stories">All stories</Link>
    <button type="button" onClick={signOutUser}>Sign out</button>
  </div>
)

export default Navbar
