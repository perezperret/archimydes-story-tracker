import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ signOutUser }) => (
  <div className="d-flex justify-content-between align-items-center py-3 mb-5">
    <h1 className="h6 mb-0">StoryTracker | Admin</h1>

    <div className="d-flex align-items-center">
      <Link to="/admin/stories" className="text-secondary">All stories</Link>

      <button
        className="btn btn-outline-secondary ml-3"
        type="button" onClick={signOutUser}
      >
        Sign out
      </button>
    </div>
  </div>
)

export default Navbar
