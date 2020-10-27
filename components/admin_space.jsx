import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"

import { withCurrentUser } from './current_user_context'
import AdminStories from './admin_stories'

const AdminSpace = ({ signOutUser }) => (
  <div>
    <div>Admin space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>

    <AdminStories />
  </div>
)

export default withCurrentUser(AdminSpace)
