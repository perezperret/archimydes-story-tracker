import React from 'react'
import ReactDOM from 'react-dom'

import { withCurrentUser } from './current_user_context'
import NewStory from './new_story'

const UserSpace = ({ signOutUser, currentUser }) => (
  <div>
    <div>User space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>

    <NewStory />
  </div>
)

export default withCurrentUser(UserSpace)
