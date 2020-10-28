import React from 'react'
import ReactDOM from 'react-dom'
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"

import { withCurrentUser } from './current_user_context'
import UserStories from './user_stories'
import NewStory from './new_story'

const UserSpace = ({ currentUser, signOutUser }) => (
  <div>
    <div>User space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>

    <Switch>
      <Route path="/app/stories/new"><NewStory /></Route>
      <Route path="/app/stories"><UserStories /></Route>
      <Route path="/app"><Redirect to="/app/stories/new" /></Route>
    </Switch>
  </div>
)

export default withCurrentUser(UserSpace)
