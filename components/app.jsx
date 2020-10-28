import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Link, Redirect } from "react-router-dom"

import { consumeCurrentUser } from './contexts/current_user_context'
import Navbar from './app/navbar'
import StoriesNew from './app/stories/new'
import StoriesAll from './app/stories/all'

const App = ({ currentUser, signOutUser }) => (
  <div>
    { currentUser?.role == 'user' ? null : <Redirect to="/" /> }

    <Navbar signOutUser={signOutUser} />

    <Switch>
      <Route path="/app/stories/new"><StoriesNew /></Route>
      <Route path="/app/stories"><StoriesAll /></Route>
      <Route path="/app"><Redirect to="/app/stories/new" /></Route>
    </Switch>
  </div>
)

export default consumeCurrentUser(App)
