import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import { consumeCurrentUser } from './contexts/current_user_context'
import Navbar from './admin/navbar'
import StoriesAll from './admin/stories/all'
import StoriesShow from './admin/stories/show'

const Admin = ({ currentUser, signOutUser }) => (
  <div>
    { currentUser?.role == 'Admin' ? null : <Redirect to="/" /> }

    <Navbar signOutUser={signOutUser} />

    <Switch>
      <Route path="/admin/stories/:id"><StoriesShow /></Route>
      <Route path="/admin/stories"><StoriesAll /></Route>
      <Route path="/admin"><Redirect to="/admin/stories" /></Route>
    </Switch>
  </div>
)

export default consumeCurrentUser(Admin)
